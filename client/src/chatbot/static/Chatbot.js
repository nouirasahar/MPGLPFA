class chatbox {
    constructor(scriptRoot) {
        this.SCRIPT_ROOT = scriptRoot;

        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch(this.SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })

        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const scriptRoot = process.env.REACT_APP_SCRIPT_ROOT || 'http://127.0.0.1:5000';
    const chatboxInstance = new chatbox(scriptRoot);
    chatboxInstance.display();
});
