const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const basePath = './src/blacklisteds/';
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

        if (fs.exists(`${basePath}${interaction.guildId}.json`, function (exists) {
            if (exists) {
                fs.readFile(`${basePath}${interaction.guildId}.json`, 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        obj = JSON.parse(data);
                        
                        const strongholds = Object.keys(obj)
                        if(nick){
                            const filterArray = strongholds.filter(element => obj[element].includes(nick))
                            if(filterArray.length == 0)
                            msg = `:pepewow: NENHUM BO REGISTRADO NO NOME ACUSADO. :PepeHappy: LIBERADO PARA FAZER CONTEÚDO...POR ENQUANTO... :eyes:`
                            else
                            msg =`:police_car: ALERTA DE CRIMINOSO!! :radioactive: CUIDADO COM ESTE MELIANTE!! :3416bonk: SUA PARTY CORRE SÉRIOS RISCOS!! :sos: FUJA IMEDIATAMENTE!!, CLONES DO MELIANTE:
                            ${obj[filterArray[0]]}`;
                            interaction.reply({ content: `${msg}`, ephemeral: false });

                        }else if(stronghold){
                            if(!obj[stronghold])
                            msg = `:4379_ShrekStare: STRONGHOLD LIBERADA PARA CONTEÚDO. TA LIMPA :thumbs_up:`
                            else
                            msg =`:skull_crossbones: PERIGO!!! STRONG PROIBIDA!! :rotating_light: PARE IMEDIATAMENTE A RAID :hand_splayed:, CUIDADO COM ESSES TAMBÉM:
                            ${obj[stronghold]}`;
                            interaction.reply({ content: `${msg}`, ephemeral: false });


                        }else{
                            msg = `:9758christmasstarecat: Quer procurar sem colocar parâmetro meu herói? Escolhe um campo ai, é fácil (Nick ou Strong) :5394_knowledge:`;
                            interaction.reply({ content: `${msg}`, ephemeral: false });
                            return;

                        }

                            
                        
                    }
                })
            } else {

                    msg = `Nenhum nick cadastrado`;
                    interaction.reply({ content: `${msg}`, ephemeral: false });
                }
            

        }));
    }
}

