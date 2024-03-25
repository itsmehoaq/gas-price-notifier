const fs = require("node:fs");
const path = require("node:path");
const {SlashCommandBuilder} = require('discord.js');

const jsonPricesPath = path.resolve(process.cwd(), "prices.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thongbaoxang')
        .setDescription('Thông báo giá xăng')
        .addNumberOption((option) =>
            option.setName("92").setDescription("Giá xăng 92").setRequired(true)
        )
        .addNumberOption((option) =>
            option.setName("95").setDescription("Giá xăng 95").setRequired(true)
        )
    ,
    async execute(interaction) {
        try {
            const new92Price = interaction.options.getNumber('92');
            const new95Price = interaction.options.getNumber('95');

            const currentPrices = JSON.parse(fs.readFileSync(jsonPricesPath));

            const diff = {
                "92": new92Price - currentPrices["92"],
                "95": new92Price - currentPrices["95"]
            }

            console.log({currentPrices, diff});

            fs.writeFileSync(jsonPricesPath, JSON.stringify({"92": new92Price, "95": new95Price}, null, 2), 'utf8');

            interaction.channel.send({
                content: "@everyone **ᴘɪɴ ᴘᴏɴ ᴘᴀɴ ᴘᴏɴ**\n**Update giá xăng trong nước, theo kỳ điều chỉnh được áp dụng từ 15h chiều hôm nay như sau:**",
                embeds: [
                    {
                        "title": "E5RON92",
                        "color": 16711680,
                        "fields": [
                            {
                                "name": "Giá mới",
                                "value": `${new92Price.toLocaleString("vi-VN")} đồng/lít`,
                                "inline": true
                            },
                            {
                                "name": "Chênh lệch",
                                "value": `${diff["92"] < 0 ? "▼" : "▲"} ${Math.abs(diff["92"]).toLocaleString("vi-VN")} đồng/lít`,
                                "inline": true
                            }
                        ]
                    },
                    {
                        "title": "RON95",
                        "color": 16711680,
                        "fields": [
                            {
                                "name": "Giá mới",
                                "value": `${new95Price.toLocaleString("vi-VN")} đồng/lít`,
                                "inline": true
                            },
                            {
                                "name": "Chênh lệch",
                                "value": `${diff["95"] < 0 ? "▼" : "▲"} ${Math.abs(diff["95"]).toLocaleString("vi-VN")} đồng/lít`,
                                "inline": true
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