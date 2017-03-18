/*
 * 8ball
 *
 * 在群組中使用 '8ball （在Telegram群組中使用 /8ball）
 */
'use strict';

const eightballs = ['As I see it, yes', 'It is certain', 'It is decidedly so', 'Most likely',
    'Outlook good', 'Signs point to yes', 'One would be wise to think so', 'Naturally', 'Without a doubt',
    'Yes', 'Yes, definitely', 'You may rely on it', 'Reply hazy, try again', 'Ask again later',
    'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again',
    'You know the answer better than I', 'Maybe...', 'You\'re kidding, right?', 'Don\'t count on it',
    'In your dreams', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];

module.exports = (pluginManager, options) => {
    const bridge = pluginManager.plugins.transport;
    const Broadcast = pluginManager.global.Broadcast;

    const eightball = context => {
        let result = eightballs[Math.random() * eightballs.length];

        context.reply(result);

        // 如果開啟了互聯，而且是在公開群組中使用本命令，那麼讓其他群也看見掀桌
        if (bridge && !context.isPrivate) {
            bridge.sendAfter(context, new Broadcast(context, {
                text: `8ball: ${result}`,
            }));
        }
    };

    for (let [type, handler] of pluginManager.handlers) {
        handler.addCommand("'8ball", eightball);
    }
};
