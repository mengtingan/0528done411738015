class obj{ //宣告一個類別，一個物件/圖案就是一個類別，針對所畫的圖，設定的基本條件
    constructor(args){//預設值，物件的基本資料（ex.物件的顏色、移動的速度、物件的大小、物件初始顯示位置）
      //this.p = args.p||{x:random(0,width), y:random(0,height)}//描述該物件的初始位置，x軸為零到視窗寬度，y軸為零到視窗高度，零可忽略不寫，但可更換他的初始位置，ex.(100,width)
      this.p = args.p|| createVector(random(0,width),random(0,height))
      this.v = createVector( random(-1,1), random(-1,1))//物件移動的速度，x軸正負為左右，y軸正負為上下
      this.size = random(10,20)//亂數抽物件大小10倍到20倍
      this.color = random(fill_colors)
      this.stroke = random(line_colors)
    }
    draw(){//畫出單一個物件形狀
      push()//執行push()後，依照我的設定，設定原點在(0,0)位置
        translate(this.p.x, this.p.y) //該物件位置為原點，this.p在constructor中，x,y為指定這個p中的x與y，畫圖時要將圖畫到圖型的正中心
        scale(this.v.x<0?1:-1,-1)//if this.v.x<0?條件成立值為1，否則值為-1，大象鼻子向左邊就是1，右邊就是-1//否則要用:
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)//線條粗細
        beginShape()
        for(var k = 0; k < points.length ; k = k + 1){//k要小於點的長度//下面加一上面就要減一
          //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)//0代表x軸＝第一個數字，1代表y軸//k+1為x,y點的下一個點
          //vertex(points[k][0]*this.size,points[k][1]*this.size)//vertex”只需設定一個點，當程式碼跑到endShape()，會把所有的點串接再一起
          curveVertex(points[k][0]*this.size,points[k][1]*this.size)//圓弧圖形，但上面的for回圈指令中points.length的-1則要去掉
        }
        endShape()
      pop()//執行pop()之後，原點(0,0)回到整個視窗的左上角
    }
    update(){//移動後設定位置資料值為何
      // this.p.x = this.p.x + this.v.x
      // this.p.y = this.p.y + this.v.y
      this.p.add(this.v)
      //let mouseV=createVector(mouseX,mouseY)//大象隨著滑鼠移動
      //let delta=mouseV.sub(this.p).limit(this.v.mag()*2)
      //this.p.add(delta)
    if (this.p.x<=0||this.p.x>=width)
    {
      this.v.x=-this.v.x
    }
    if (this.p.y<=0||this.p.y>=height)
    {
      this.v.y=-this.v.y
    }
    }
isBallInRanger(x,y){
let d =dist(x,y,this.p.x,this.p.y)
if (d<this.size*4){//4的由來:去看作標點最大的值，一此作為方框的高與寬
return true//代表距離有再範圍
}else{
return false//代表去離沒有在範圍
}
}
}
