const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const basePath = './src/blacklisteds/blacklist.json';
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search if someone is blacklisted")
        .addStringOption(option =>
            option.setName("nick")
                .setDescription("Search by nick")
                .setRequired(false))
        .addStringOption(option =>
            option.setName("stronghold")
                .setDescription("Search by stronghold")
                .setRequired(false)),
    async execute(interaction) {
        const nick = interaction.options.getString("nick");
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
                        
                        const strongholds = Object.keys(obj)
                        if(nick){
                            const filterArray = strongholds.filter(element => obj[element].includes(nick))
                            if(filterArray.length == 0)
                            msg = `Nick não blacklistado`
                            else
                            msg =`Nick blacklistado, Outros personagens:
                            ${obj[filterArray[0]]}`;
                            interaction.reply({ content: `${msg}`, ephemeral: true });

                        }else if(stronghold){
                            if(!obj[stronghold])
                            msg = `Stronghold não blacklistado`
                            else
                            msg =`Stronghold blacklistado, Outros personagens:
                            ${obj[stronghold]}`;
                            interaction.reply({ content: `${msg}`, ephemeral: true });


                        }else{
                            msg = `Digite ao menos 1 campo`;
                            interaction.reply({ content: `${msg}`, ephemeral: true });
                            return;

                        }

                            
                        
                    }
                })
            } else {

                    msg = `Nenhum nick cadastrado`;
                    interaction.reply({ content: `${msg}`, ephemeral: true });
                }
            

        }));
    }
}

