import json
import random
from difflib import get_close_matches


def load_knowledge_base(filepath) -> dict:
    with open(filepath, "r", encoding="utf-8") as file:
        return json.load(file)


def save_knowledge_base(filepath: str, data: dict):
    with open(filepath, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)


def find_best_match(user_input: str, knowledge_base: dict):
    all_patterns = []
    pattern_to_intent = {}

    for intent, entries in knowledge_base.items():
        for entry in entries:
            for pattern in entry["patterns"]:
                all_patterns.append(pattern)
                pattern_to_intent[pattern] = (intent, entry)

    matches = get_close_matches(
        user_input.lower(), all_patterns, n=1, cutoff=0.6)
    if matches:
        best_pattern = matches[0]
        return pattern_to_intent[best_pattern]
    return None, None


def handle_unknown_input(user_input: str, knowledge_base: dict, filepath: str):
    print("Bot : I'm sorry, I can't answer that, can you please provide more explanation?")
    print("Bot: I'm not trained to respond to that yet. Can you teach me?")
    new_response = input("Type a response or 'skip' to skip: ").strip()
    if new_response.lower() != "skip":
        print("Please specify an intent category (e.g., greetings, help, feelings):")
        new_intent = input("Intent: ").strip().lower()

        if new_intent not in knowledge_base:
            knowledge_base[new_intent] = []

        added = False
        for entry in knowledge_base[new_intent]:
            if new_response not in entry["responses"]:
                entry["patterns"].append(user_input)
                entry["responses"].append(new_response)
                added = True
                break

        if not added:
            knowledge_base[new_intent].append({
                "patterns": [user_input],
                "responses": [new_response]
            })

        save_knowledge_base(filepath, knowledge_base)
        print("Bot: Thank you! I've learned something new.\nHow can I be useful for you today?")
