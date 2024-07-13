//Message class for eventual use in refactoring.

class Message {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    display(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container element "${containerId}" not found.`);
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.className = `message ${this.type}`;
        messageElement.innerText = this.content;
        container.appendChild(messageElement);

        // Automatically remove message after some time
        // setTimeout(() => {
        //     messageElement.remove();
        // }, 5000); // 5000 milliseconds
    }
}

//Example use:
// class RaindropApp {
//     constructor(levelTimeout, levelWordLength) {
//         // Constructor code here
//         this.message = new Message('', ''); // Initialize with empty values
//     }
//
//     // Method to set and display a message
//     showMessage(type, content, containerId) {
//         this.message = new Message(type, content);
//         this.message.display(containerId);
//     }
//
//     // Example method usage
//     exampleMethod() {
//         // Perform some actions
//         if (/* condition */) {
//             this.showMessage('info', 'Informational message', 'message-container');
//         } else {
//             this.showMessage('error', 'Error message', 'message-container');
//         }
//
//         // Another example: Using message in API call
//         this.postWord('exampleWord'); // Assuming postWord method exists
//     }
// }
