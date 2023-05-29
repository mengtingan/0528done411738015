//定義一個bullet物件的class

class Bullet{
    constructor(args){//預設值，基本資料
        this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有傳參數，就以10為主
        this.p = args.p || shipP.copy()                    //createVector(width/2,height/2)    //建立一個向量，{x:width/2,y:height/2}
        this.color = args.color || "#FF4242"//設定顏色
        this.size = 5
        // 根据炮台的方向设置子弹的速度向量
        this.v = args.v || createVector(shapeRotation + cos(radians(shapeRotation)) * 50,shapeRotation + sin(radians(shapeRotation)) * 50).limit(10)
    }   
    draw(){//繪出物件程式碼
        push()
            translate(this.p.x,this.p.y)
            rotate(this.v)
            fill(this.color)
            noStroke()
            scale(-1,-1)
            // ellipse(0,0,this.r)//目前只是一個圓的子彈
            beginShape()//子彈上方尖頭
                curveVertex(0*this.size,3*this.size)
                curveVertex(1*this.size,1*this.size)
                curveVertex(-1*this.size,1*this.size)
                curveVertex(0*this.size,3*this.size)
            endShape(CLOSE)

            beginShape()//子彈下方方形
                vertex(-1*this.size,1*this.size)
                vertex(1*this.size,1*this.size)
                vertex(1*this.size,-2*this.size)
                vertex(-1*this.size,-2*this.size)
                vertex(-1*this.size,1*this.size)
            endShape()
        pop()
    }
    offscreen() {
        // 检查子弹是否超出边界
        return this.y < 0;
      }
    
    update(){//計算出移動後的位置
        this.p.add(this.v)
    }
  }