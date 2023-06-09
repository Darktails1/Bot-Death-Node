const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const basePath = './src/blacklisteds/';
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

        if (fs.exists(`${basePath}${interaction.guildId}.json`, function (exists) {
            if (exists) {
                fs.readFile(`${basePath}${interaction.guildId}.json`, 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        obj = JSON.parse(data);
                        

                            if (obj[stronghold]) {
                                
                                delete obj[stronghold]
                                var json = JSON.stringify(obj);
                                fs.writeFile(`${basePath}${interaction.guildId}.json`, json, function readFileCallback(err) {
                                    if (err) console.log(err)
                                });
                                msg = `:squid: Liberdade cantou para ${stronghold}`;
                                interaction.reply({ content: `${msg}`, ephemeral: false });

                            }
                            else {
                                msg = `Stronghold não encontrada. Ta limpa, por enquanto... :eyes:`;
                                interaction.reply({ content: `${msg}`, ephemeral: false });
                            }
                        
                    }
                })
            } else {
                msg = `:index_pointing_at_the_viewer: Cê tem que cadastrar uma Stronghold primeiro meu herói.`;
                interaction.reply({ content: `${msg}`, ephemeral: false });
                }
            

        }));
    }
}
