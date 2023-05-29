let points = [[0,7], [1,6.7], [2,6.5],[3,6],[3.5,5],[3.7,4],[3.5,3],[3.2,2],[2,1],[3,1.2],[4,1.5],[5,1.6],[6,1.8],[7,2],[7.5,2],[7.3,1], [7.2,0], [7,-1],[6.5,-2],[6,-3],[5,-4],[4,-4.3], [3,-4.5],[2,-4.7],[1,-5],[0,-5],[-1,-4.8],[-2,-4.7],[-3,-4],[-3.5,-3],[-3.4,-2], [-3.3,-1], [-3,0],[-2,1],[-3,2],[-5,3],[-3,4], [-2.8,5],[-2.2,6],[-1,6.8],[0,7],[1,6.7],[2,6.5]]; //list資料，
var fill_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)
var line_colors = "dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)
//class：類別、例子


//+++++++++++畫points所有的點的物件定義++++++++++++++++++++++++++
var ball//目前要處理的物件，暫時放在ball變數內
var balls = [] //宣告balls為一群陣列，把產生“所有”的物件

//+++++++++++設定飛彈物件的變數++++++++++++++++++++++++++++++++++
var bullet
var bullets = []
var maxBulletCount = 40 // 最大子彈量
var remainingBullets = maxBulletCount//計算子彈數量
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var monster
var monsters = []

//++++++++++++++++設定砲台的位置+++++++++++++++++++++++++++++++++++

var shipP
//此變數主要在記錄砲台的位置
var shapeRotation = -40
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var score=0

function preload(){//程式碼準備執行之前，所執行的程式碼內容，比setup()更早執行
  duck_sound = loadSound("sound/duck.mp3")
  bg_sound = loadSound("sound/water.mp3")
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  //宣告一個向量的值createVector
  bg_sound.loop()
  shipP = createVector(width/2,height-20)//預設砲台的位置為(width/2,height-20)

  for(var i = 0 ; i < 10 ; i = i + 1){//設定迴圈，if i+1，i=0~9共繞回圈10次；if i+2，i=0,2,4,6,8
    ball = new obj({}) //產生一個obj class元件
    balls.push(ball)//把ball的物件放入（push）到balls陣列內
  }
  for(var i = 0 ; i < 20 ; i = i + 1){//設定迴圈，if i+1，i=0~9共繞回圈10次；if i+2，i=0,2,4,6,8
    monster = new Monster({}) //產生一個Monster class元件
    monsters.push(monster)//把monster的物件放入（push）到monsters陣列內
  }
}

function draw() {//每秒執行60次
  background("#90e0ef");
  // for(var j = 0; j < balls.length; j = j + 1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }


  //++++++++++當鍵盤按下後++++++++++++++
  if(keyIsPressed){
    if(key=="ArrowLeft"){//按下上下左右鍵中的“左”鍵
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight"){//按下上下左右鍵中的“右”鍵
      shipP.x = shipP.x + 5
    }
    // if(key=="ArrowUp"){//按下上下左右鍵中的“上”鍵
    //   shipP.y = shipP.y - 5
    // }
    // if(key=="ArrowDown"){//按下上下左右鍵中的“下”鍵
    //   shipP.y = shipP.y + 5
    // }
    if(key=="a"){//按下上下左右鍵中的a鍵，砲台發射角度向左旋轉3度
      shapeRotation -= 3
    }
    if(key=="d"){//按下上下左右鍵中的d鍵，砲台發射角度向右旋轉3度
      shapeRotation += 3
    }
  }


  //打到物件(打到鴨子加2分)
  for (let ball of balls){//針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    for(let bullet of bullets){//檢查每一個物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){//飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 2
        duck_sound.play()
      }

    }
  }
//飛彈的顯示
  // for (let bullet of bullets){//針對陣列變數，取出陣列內一個一個的物件
  //   bullet.draw()
  //   bullet.update()
  // }
  
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i]
      bullet.draw()
      bullet.update()

    // 如果子弹超出边界或达到最大数量，从数组中移除
    if(bullet.offscreen() || bullets.length > maxBulletCount) {
      bullets.splice(i, 1)
    }
  }
  

//魚的顯示(打到魚加4分)
  for (let monster of monsters){//針對陣列變數，取出陣列內一個一個的物件
    if(monster.dead == true && monster.timenum>4){
      monsters.splice(monsters.indexOf(monster),1)//從倉庫中取出，只取一個
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){//檢查每一個物件
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){//飛彈物件有沒有接觸現在的魚
        // monsters.splice(monsters.indexOf(monster),1)//從倉庫魚取出被滑鼠按到的物件，只取一個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 4
        monster.dead = true
        //elephant_sound.play()
      }
    }
  }
  textSize(50)
  text("分數：" + score,50,50)
  text("子彈數量：" + remainingBullets,50,110)

//砲台的顯示
  push()
    translate(shipP.x,shipP.y)//將原點（砲台的中心點）放在視窗中心
    let dx = shapeRotation + cos(radians(shapeRotation)) * 50
    let dy = shapeRotation + sin(radians(shapeRotation)) * 50
     //算出x與y跟寬與高的距離
    let angle = atan2(dy,dx)//用arctan算出轉向度數
    noStroke()
    rotate(angle)

    fill("#645DD7")
    ellipse(0,0,90)
    fill("#CD1818")
    triangle(50,0,-25,25,-25,-25)//要輸入三個點，在中間畫一個三角形
  pop()//將原點恢復到原本位置
}
// function mousePressed(){//按下滑鼠產出一個物件程式碼
//   ball = new obj({
//     p:{x:mouseX, y:mouseY}
//   }) //產生一個obj class元件
//     balls.push(ball)//把ball的物件放入（push）到balls陣列內
// }
//  function mousePressed(){
//   for(let ball of balls){
//   if(ball.isBallInRanger()){
//     score=score+1
//     balls.splice(balls.indexOf(ball),1)//把倉庫第幾個刪除，只刪除1個
//   }
// }



//+++++++++++++按一下要產生一個飛彈++++++++++++
    // bullet = new Bullet({})//在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
    // bullets.push(bullet)//把bullet的物件放入到bullets陣列內(丟到倉庫)
    // bullet_sound.play()
  // }
//+++++++++++++按一下"上"鍵發射飛彈++++++++++++++
  function keyPressed(){//key代表鍵盤
    //按下空白鍵發射飛彈，若要按下a發射飛彈，就在""內打上a
      if(key=="ArrowUp"&& remainingBullets > 0){//按下”上“鍵發射飛彈，若要按下a發射飛彈，就在""內打上a//其實跟滑鼠功能一樣
        bullet = new Bullet({})//在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
        bullets.push(bullet)//把bullet的物件放入到bullets陣列內(丟到倉庫)
        remainingBullets =remainingBullets - 1; //減少剩餘子彈數量
        //bullet_sound.play()
      }

      if(key=="ArrowLeft"){//按下上下左右鍵中的“左”鍵，向左移動
        shipP.x = shipP.x - 5
      }
      if(key=="ArrowRight"){//按下上下左右鍵中的“右”鍵，向右移動
        shipP.x = shipP.x + 5
      }
      if(key=="a"){//按下上下左右鍵中的a鍵，砲台發射角度向左旋轉3度
        shapeRotation -= 3
      }
      if(key=="d"){//按下上下左右鍵中的d鍵，砲台發射角度向右旋轉3度
        shapeRotation += 3
      }
    }

      // if(key=="ArrowUp" || key=="w"){//按下上下左右鍵中的“上”鍵或w鍵
      //   shipP.y = shipP.y - 5
      // }
      // if(key=="ArrowDown" || key=="s"){//按下上下左右鍵中的“下”鍵或s鍵
      //   shipP.y = shipP.y + 5
      // }
  
