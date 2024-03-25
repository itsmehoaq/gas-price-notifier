const fs = require("node:fs");
const path = require("node:path");
const {SlashCommandBuilder} = require('discord.js');

const jsonPricesPath = path.resolve(process.cwd(), "prices.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giaxang')
        .setDescription('Lấy thông tin giá xăng hiện tại')
    ,
    async execute(interaction) {
        try {
            const currentPrices = JSON.parse(fs.readFileSync(jsonPricesPath));

            interaction.reply({
                content: "**Giá xăng trong nước hiện tại:**",
                embeds: [
                    {
                        "title": "GIÁ XĂNG",
                        "color": 16711680,
                        "fields": [
                            {
                                "name": "E5RON92",
                                "value": `${currentPrices["92"].toLocaleString("vi-VN")} đồng/lít`,
                            },
                            {
                                "name": "RON95",
                                "value": `${currentPrices["92"].toLocaleString("vi-VN")} đồng/lít`,
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            console.error(err)
        }
    },
};