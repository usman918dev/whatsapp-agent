const fs = require('fs');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

/**
 * Handle incoming messages
 * @param {Object} msg - WhatsApp message object
 */
async function handleMessage(msg) {
    try {
        // Get the contact who sent the message
        const contact = await msg.getContact();
        const chatId = msg.from;
        const chat = await msg.getChat();
        
        // Log incoming message
        console.log(` Message from: ${contact.pushname || chatId}`);
        console.log(` Chat: ${chat.name || 'Private'}`);
        console.log(` Message: ${msg.body}`);
        
    
            if (msg.body.startsWith('techo ')) {
                const replyText = msg.body.slice(6);
                await msg.reply(replyText);
                return;
            }

            // Check for course codes and send PDFs
            const lowerBody = msg.body.toLowerCase();
            if (lowerBody.includes('cs610')) {
                const filePath = path.join(__dirname, '..', 'handouts', 'CS610_Handouts.pdf');
                if (fs.existsSync(filePath)) {
                    const media = MessageMedia.fromFilePath(filePath);
                    console.log(" ia maou ")
                    await msg.reply(media);
                } else {
                    await msg.reply('PDF for CS610 not found.');
                }
            }
if (lowerBody.includes('cs304')) {
const filePath = path.join(__dirname, '..', 'handouts', 'CS304_Handouts.pdf');
if (fs.existsSync(filePath)) {
const media = MessageMedia.fromFilePath(filePath);
// Send media with caption (combined message)
await msg.reply(media, undefined, {caption: "CS304 Handouts & MCQs\n\n" +"Here’s your quiz link:\n👉 https://vu-project-delta.vercel.app/quiz/CS304_GRAND_QUIZ_MIDTERM\n\n " + "📄 The attached PDF contains all handouts for your study.\n\n" + "Best of luck with your preparation!\n\n" + "Regards,\nTecho Bot"
});
} else {
await msg.reply('⚠️ PDF for CS304 not found.');
}
}
            if (lowerBody.includes('cs301')) {
                const filePath = path.join(__dirname, '..', 'handouts', 'CS301_Handouts.pdf');
                if (fs.existsSync(filePath)) {
                    const media = MessageMedia.fromFilePath(filePath);
                    await msg.reply(media);
                } else {
                    await msg.reply('PDF for CS301 not found.');
                }
            }
        
        
        // Handle ping command for testing
        if (msg.body === '!ping') {
            await msg.reply(' Pong! Bot is active and running.');
        }
        
    } catch (error) {
        console.error(' Error handling message:', error);
    }
}

module.exports = { handleMessage };











// import { getAIResponse } from '../services/aiServices.js';
// import { isValidQuestion, formatResponse } from '../utils/helpers.js';

// /**
//  * Handle incoming messages
//  * @param {Object} msg - WhatsApp message object
//  */
// async function handleMessage(msg) {
//     try {
//         // Get the contact who sent the message
//         const contact = await msg.getContact();
//         const chatId = msg.from;
//         const chat = await msg.getChat();
        

        
//         // Handle messages from specific group/chat only
//         if (!msg.fromMe && msg.from === '923175416388@c.us') {
//             // Validate if it's a formal question
//              // Log incoming message
//         console.log(` Message from: ${ chatId}`);
//         console.log(` Chat: ${chat.name || 'Private'}`);
//         console.log(` Message: ${msg.body}`);

//             if (!isValidQuestion(msg)) {
//                 console.log(' Invalid message format - skipping AI response');
//                 return;
//             }
//              console.log(' Valid message format - processing with AI');
//             // Show typing indicator
//             await chat.sendStateTyping();

//             // Get AI response
//             try {
//                 console.log(` Processing with AI...`);
//                 const aiResponse = await getAIResponse();
//                 const formattedResponse = formatResponse(aiResponse);
                
//                 await msg.reply(formattedResponse);
//                 console.log(` AI response sent successfully`);
//                 console.log('─'.repeat(50));
//             } catch (error) {
//                 console.error(' AI response failed:', error.message);
//                 await msg.reply('Sorry, I am having trouble processing your request right now. Please try again in a moment.');
//             }
//         }
        
//         // Handle ping command for testing
//         if (msg.body === '!ping') {
//             await msg.reply(' Pong! Bot is active and running.');
//         }
        
//     } catch (error) {
//         console.error(' Error handling message:', error);
//     }
// }

// module.exports = { handleMessage };
