import warnings
import pandas as pd
import os
import re

warnings.filterwarnings("ignore")

class HealthcareNLPEngine:
    def __init__(self):
        print("Loading MedChat NLP Engine (Ultra-Fast Mode)...")

        # Load CSV dataset
        csv_path = os.path.join(os.path.dirname(__file__), "disease_dataset.csv")
        self.dataset = pd.read_csv(csv_path)

        # Precompute symptom list - sorted by length descending so multi-word symptoms match first
        self.known_symptoms = sorted(
            [str(symp).strip().lower() for symp in self.dataset['symptom'].dropna().tolist()],
            key=len, reverse=True
        )

        # Build a fast lookup dict for O(1) dataset access
        self.symptom_map = {}
        for _, row in self.dataset.iterrows():
            key = str(row['symptom']).strip().lower()
            self.symptom_map[key] = row

        # Emergency keywords
        self.emergency_keywords = [
            "heart attack", "can't breathe", "cannot breathe", "not breathing",
            "unconscious", "stroke", "paralyzed", "severe chest pain",
            "chest pain", "bleeding heavily", "poisoned"
        ]

        # Greeting keywords
        self.greeting_keywords = [
            "hi", "hello", "hey", "good morning", "good afternoon",
            "good evening", "how are you", "what's up", "howdy"
        ]

        # Common filler phrases to strip before matching
        self.filler_phrases = [
            "i am suffering from", "i have", "i'm having", "i have been experiencing",
            "i feel", "i am feeling", "i've been feeling", "i've got",
            "i got", "experiencing", "suffering from", "dealing with",
            "diagnosed with", "having", "my symptom is", "symptoms are",
            "symptom is", "symptoms:", "i think i have", "i think i've got"
        ]

        print(f"Loaded {len(self.known_symptoms)} symptoms from dataset. Ready!")

    def _clean_text(self, text: str) -> str:
        """Remove filler phrases to isolate potential symptom keywords."""
        text = text.lower().strip()
        for phrase in self.filler_phrases:
            text = text.replace(phrase, " ")
        # Collapse multiple spaces
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def _extract_symptoms(self, raw_text: str):
        """
        Two-pass symptom extraction:
        1. Search the raw text directly for known symptoms (exact substring match)
        2. Search the cleaned text (after stripping filler phrases)
        Returns a list of matched symptom strings.
        """
        text_lower = raw_text.lower()
        cleaned = self._clean_text(raw_text)
        found = []

        for symp in self.known_symptoms:
            # Check raw text first
            if symp in text_lower:
                if symp not in found:
                    found.append(symp)
            # Check cleaned text
            elif symp in cleaned:
                if symp not in found:
                    found.append(symp)

        return found

    def process_query(self, text: str, session_id: str, language: str):
        text_lower = text.lower().strip()

        # 1. Emergency Detection
        for kw in self.emergency_keywords:
            if kw in text_lower:
                return {
                    "intent": "emergency",
                    "entities": [{"text": kw, "label": "EMERGENCY"}],
                    "reply": (
                        "🚨 **EMERGENCY DETECTED!**\n\n"
                        "Please call **108 (Ambulance)** or **112 (National Emergency)** immediately "
                        "or rush to the nearest hospital.\n\n"
                        "Do **NOT** wait — this may be life-threatening."
                    ),
                    "is_emergency": True,
                    "xai_explanation": f"Critical keyword '{kw}' detected, indicating a potential life-threatening emergency.",
                    "medicines": ["DO NOT SELF-MEDICATE — SEEK EMERGENCY CARE NOW"],
                    "doctors": ["Emergency Medicine Specialist", "Cardiologist"]
                }

        # 2. Greeting Detection
        for greet in self.greeting_keywords:
            if text_lower == greet or text_lower.startswith(greet + " ") or text_lower.startswith(greet + ","):
                return {
                    "intent": "casual greeting",
                    "entities": [],
                    "reply": (
                        f"Hello! 👋 I'm **MedChat AI**, your intelligent health assistant.\n\n"
                        f"Please describe your symptoms and I'll analyze them instantly. "
                        f"For example: *'I have a fever and headache'*."
                    ),
                    "is_emergency": False,
                    "xai_explanation": "Awaiting symptom analysis...",
                    "medicines": [],
                    "doctors": []
                }

        # 3. Appointment intent
        if "book" in text_lower or "appointment" in text_lower or "schedule" in text_lower:
            return {
                "intent": "appointment booking",
                "entities": [],
                "reply": (
                    "I can help you book an appointment! 📅\n\n"
                    "Please go to the **Appointments** tab in the navigation bar to browse available doctors and schedule a visit."
                ),
                "is_emergency": False,
                "xai_explanation": "Awaiting symptom analysis...",
                "medicines": [],
                "doctors": []
            }

        # 4. Symptom Extraction
        extracted = self._extract_symptoms(text)

        reply = ""
        xai = ""
        medicines = []
        doctors = []
        entities = []

        disclaimer = "\n\n⚠️ *Disclaimer: This is an AI prediction, not a clinical diagnosis. Please consult a doctor.*"

        if extracted:
            # Pick the best (most specific / longest) match
            primary = extracted[0]
            row = self.symptom_map.get(primary)

            if row is not None:
                disease = str(row['disease'])
                medicines = [str(row['medicine_1']), str(row['medicine_2'])]
                doctors = [str(row['doctor_1']), str(row['doctor_2'])]
                follow_up = str(row['follow_up'])

                entities = [{"text": primary, "label": "SYMPTOM"}]
                xai = (
                    f"Your reported symptom **'{primary}'** is clinically correlated with "
                    f"**{disease}** in our medical dataset."
                )

                all_syms = ", ".join(extracted) if len(extracted) > 1 else primary
                reply = (
                    f"Based on your symptom(s) — **{all_syms}** — this indicates possible **{disease}**.\n\n"
                    f"**Suggested Medicines:** {medicines[0]}, {medicines[1]}\n"
                    f"**Recommended Specialists:** {doctors[0]}, {doctors[1]}\n\n"
                    f"**Follow-up:** {follow_up}"
                    + disclaimer
                )
            else:
                reply = (
                    f"I detected the symptom '{primary}' but couldn't find a match in my dataset. "
                    f"Please describe your symptoms in more detail." + disclaimer
                )
        else:
            reply = (
                "I couldn't identify a specific symptom from your message. "
                "Could you describe what you're feeling more clearly? "
                "For example: *'I have a fever'*, *'I feel nauseous'*, or *'I have a sore throat'*."
                + disclaimer
            )

        # Multilingual Translation
        # Supported language codes: 'hi' = Hindi, 'te' = Telugu, 'ta' = Tamil,
        # 'kn' = Kannada, 'mr' = Marathi, 'bn' = Bengali, 'gu' = Gujarati
        if language and language != "en":
            try:
                from deep_translator import GoogleTranslator
                translator = GoogleTranslator(source='auto', target=language)

                # Strip markdown markers before translating (they break translation)
                def translate_safe(text):
                    try:
                        return translator.translate(text) or text
                    except Exception:
                        return text

                reply = translate_safe(reply)
                if xai:
                    xai = translate_safe(xai)

            except Exception as e:
                print(f"[Translation Error] Language '{language}': {e}")
                # Gracefully fall back to English if translation fails

        return {
            "intent": "symptom check" if extracted else "general medical information",
            "entities": entities,
            "reply": reply,
            "is_emergency": False,
            "xai_explanation": xai if xai else "Awaiting symptom data for XAI analysis.",
            "medicines": medicines,
            "doctors": doctors
        }


nlp_engine = HealthcareNLPEngine()

