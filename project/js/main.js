//通过canvas制作棋盘



var canvas = document.getElementById("chess");
var context = canvas.getContext("2d");
var me = true;              //判定棋子的落子顺序
var over = false;           //判断游戏是否结束
var chessBoard = [];        //棋盘以二维阵列的形式展开，并存储数据


//此处ai先下棋，则初始化棋盘后先将棋子落于接近中心的（7，7）位置

function startGame() {
    for (var i = 0; i < 15; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
            //此处将棋盘设置为15*15格式，并初始化
        }
    }
    
    // 清除棋盘
    cleanChess();
    // 绘制棋盘
    drawChess();
    
    //轮到玩家下棋
    me = true;
    //重置游戏
    over = false;
    
    //胜利条件相关的阵列
    for (var i = 0; i < count; i++) {
        myWin[i] = 0;
        aiWin[i] = 0;
    }
    
    //将第一颗黑子（ai）放置于（7，7）处，并储存信息
    oneStep(7, 7, false);
    chessBoard[7][7] = 2;
}

//清除棋盘
function cleanChess() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//制作棋盘
function drawChess() {
    for (var i = 0; i < 15; i++) {
        context.strokeStyle = "#BFBFBF";
        context.beginPath();
        context.moveTo(15 + i *30, 15);
        context.lineTo(15 + i *30, canvas.height - 15);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(15, 15 + i *30);
        context.lineTo(canvas.width - 15, 15 + i * 30);
        context.closePath();
        context.stroke();
    }
}

 //绘制棋子
  //i     棋子x轴位置
  //j     棋子y轴位置
 
function oneStep(i, j ,me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);      //arc函数绘制
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);     //设置渐变
    if (me) {
        gradient.addColorStop(0, "#D1D1D1");        //白棋
        gradient.addColorStop(1, "#F9F9F9");
    } else {
        gradient.addColorStop(0, "#0A0A0A");        //黑棋
        gradient.addColorStop(1, "#636766");
    }
    context.fillStyle = gradient;
    context.fill();
}


//鼠标点击
canvas.onclick = function(e) {
    if (over) {
        return;
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);

    // 如果该位置没有棋子,则允许落子
    if(chessBoard[i][j] == 0) {
        // 绘制棋子(玩家)
        oneStep(i, j, me);
        // 改变棋盘信息(该位置有棋子)
        chessBoard[i][j] = 1;

        // 遍历赢法统计数组
        for (var k = 0; k < count; k ++) {
            if (wins[i][j][k]) {
                //若存在赢法，则玩家胜算+1（为5的时候取胜）
                myWin[k] ++;
                //若存在赢法，则电脑胜算赋值6（不为5，即无法在此处取胜）
                aiWin[k] = 6;
                //玩家落子后，如果阵列凑够到5，则玩家胜利并游戏结束
                if (myWin[k] == 5) {
                    window.alert("You Win");
                    // 游戏结束
                    over = true;
                }
            }

        }
        //aiGo2()

        // 如果游戏没有结束,轮到电脑行棋
        if (!over) {
            me = !me;
            aiGo();
        }
    }
};

