const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const basePath = './src/blacklisteds/';
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add someone as blacklisted")
        .addStringOption(option =>
            option.setName("nick")
                .setDescription("Paste the nickname")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("stronghold")
                .setDescription("Paste the stronghold")
                .setRequired(true)),
    async execute(interaction) {
        const nick = interaction.options.getString("nick");
        const stronghold = interaction.options.getString("stronghold");
        // console.log(`[WARNING] The command at Nick: ${nick}, Stronghold: ${stronghold}`);
        var msg = 'qualquer coisa ai';
        let obj = {


        }

        if (fs.exists(`${basePath}${interaction.guildId}.json`, function (exists) {
            if (exists) {
                fs.readFile(`${basePath}${interaction.guildId}.json`, 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        obj = JSON.parse(data);
                        
                        const strongholds = Object.keys(obj)

                            if (strongholds.some(element => obj[element].includes(nick))) {
                                msg = `nick já existe`;
                                interaction.reply({ content: `${msg}`, ephemeral: false });

                            } else if (obj[stronghold] && (!obj[stronghold].includes(nick))) {
                                obj[stronghold].push(nick)
                                var json = JSON.stringify(obj);
                                fs.writeFile(`${basePath}${interaction.guildId}.json`, json, function readFileCallback(err) {
                                    if (err) console.log(err)
                                });
                                msg = `${nick} adicionado`;
                                interaction.reply({ content: `${msg}`, ephemeral: false });

                            }
                            else {

                                var nicks = [nick]
                                obj[stronghold] = nicks;
                                var json = JSON.stringify(obj);
                                fs.writeFile(`${basePath}${interaction.guildId}.json`, json, function readFileCallback(err) {
                                    if (err) console.log(err)
                                });
                                msg = `${nick} e ${stronghold} adicionado`;
                                interaction.reply({ content: `${msg}`, ephemeral: false });
                            }
                        
                    }
                })
            } else {
                var nicks = [nick]
                obj[stronghold] = nicks;
                var json = JSON.stringify(obj);
                fs.writeFile(`${basePath}${interaction.guildId}.json`, json, function readFileCallback(err) {
                    if (err) console.log(err)
                });
                    msg = `${nick} e ${stronghold} adicionado`;
                    interaction.reply({ content: `${msg}`, ephemeral: false });
                }
            

        }));
    }
}

