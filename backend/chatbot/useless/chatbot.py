import json
from difflib import get_close_matches
def load_knowledge_base(filepath)->dict:
    with open(filepath,"r") as myf:
        data : dict = json.load(myf)
        return data 

def save_knowledge_base(filepath:str, data:dict) :
    with open(filepath,'w') as myfile:
        json.dump(data,myfile,indent=4,ensure_ascii=False)


def find_best_match(user_question : str,questions:list[str])->str | None:
    matches : list = get_close_matches(user_question,questions,n=1,cutoff=0.6)
    return matches[0] if matches else None

def get_answer_for_question(question:str,knowledge_base : dict)->str|None:
    for q in knowledge_base.get("questions"):
        if question==q.get("question"):
            return q.get("answer")


def chatBot():
    knowledgeBaseFilePath="structuredData.json"
    knowledge_base:dict=load_knowledge_base(knowledgeBaseFilePath)
    while True :
        user_input : str = input("User : ")
        if user_input.lower()=="quit":
            print("Chatbot Exiting...")
            break
        best_match:str|None = find_best_match(user_input,[q["question"] for q in knowledge_base["questions"]])
        if best_match:
            answer:str=get_answer_for_question(best_match,knowledge_base)
            print(f"Bot : {answer}")
        else:
            print(f"Im not trained to answer this question. Can you teach me? ")
            new_answer:str=input("Type the answer or 'skip' to skip\n")
            if new_answer.lower()!="skip":
                knowledge_base["questions"].append({"question": user_input,"answer":new_answer})
                save_knowledge_base(knowledgeBaseFilePath,knowledge_base)
                print("Bot : Thank you, I learned a new response. :) ")
    
    
chatBot()
