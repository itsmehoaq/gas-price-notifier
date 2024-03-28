const fs = require("node:fs");
const path = require("node:path");
const { SlashCommandBuilder } = require("discord.js");

const pricesDataPath = path.resolve(process.cwd(), "prices.txt");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giaxang")
        .setDescription("Lấy thông tin giá xăng hiện tại")
    ,
    async execute(interaction) {
        try {
            const currentPrices = fs.readFileSync(pricesDataPath, "utf8");
            const [current92Price, current95Price] = currentPrices.split(",").map((value) => Number(value));

            interaction.reply({
                content: "**Giá xăng trong nước hiện tại:**",
                embeds: [
                    {
                        "title": "GIÁ XĂNG",
                        "color": 16711680,
                        "fields": [
                            {
                                "name": "E5RON92",
                                "value": `${current92Price.toLocaleString("vi-VN")} đồng/lít`,
                            },
                            {
                                "name": "RON95",
                                "value": `${current95Price.toLocaleString("vi-VN")} đồng/lít`,
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            console.error(err);
        }
    },
};