import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DISCORD_WEBHOOK_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create Discord embed message
        const discordMessage = {
            embeds: [{
                title: '📬 New Contact Form Submission',
                color: 0x7C3AED, // Purple color
                fields: [
                    {
                        name: '👤 Name',
                        value: name,
                        inline: true
                    },
                    {
                        name: '📧 Email',
                        value: email,
                        inline: true
                    },
                    {
                        name: '💬 Message',
                        value: message,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Jerasaurus Contact Form'
                }
            }]
        };

        // Send to Discord webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordMessage)
        });

        if (!response.ok) {
            console.error('Discord webhook error:', response.status, await response.text());
            return json(
                { error: 'Failed to send message' },
                { status: 500 }
            );
        }

        return json(
            { success: true, message: 'Message sent successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return json(
            { error: 'An error occurred while sending your message' },
            { status: 500 }
        );
    }
};