const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const basePath = './src/blacklisteds/blacklist.json';
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete someone's stronghold")
        .addStringOption(option =>
            option.setName("stronghold")
                .setDescription("Paste the stronghold")
                .setRequired(true)),
    async execute(interaction) {
        const stronghold = interaction.options.getString("stronghold");
        // console.log(`[WARNING] The command at Nick: ${nick}, Stronghold: ${stronghold}`);
        var msg = 'qualquer coisa ai';
        let obj = {


        }

        if (fs.exists(basePath, function (exists) {
            if (exists) {
                fs.readFile(basePath, 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        obj = JSON.parse(data);
                        

                            if (obj[stronghold]) {
                                
                                delete obj[stronghold]
                                var json = JSON.stringify(obj);
                                fs.writeFile(basePath, json, function readFileCallback(err) {
                                    if (err) console.log(err)
                                });
                                msg = `${stronghold} deletada`;
                                interaction.reply({ content: `${msg}`, ephemeral: true });

                            }
                            else {
                                msg = `Nenhuma stronghold encontrada`;
                                interaction.reply({ content: `${msg}`, ephemeral: true });
                            }
                        
                    }
                })
            } else {
                msg = `Nenhuma stronghold cadastrada`;
                interaction.reply({ content: `${msg}`, ephemeral: true });
                }
            

        }));
    }
}
