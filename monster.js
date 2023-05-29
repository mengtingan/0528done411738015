
var monster_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)

class Monster{//宣告一個類別，名稱為Monster
    //copy飛彈的constructor
    constructor(args){//預設值，基本資料
        //r是外圓的直徑
        this.r = args.r || random(5,10) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height))    //建立一個向量，由亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1))//移動的速度，如果沒有傳arg參數，就會利用亂數(-1，1)抽出移動的速度
        //預設x軸為正的1，設定從哪個位置發射
        this.color = args.color || random(monster_colors)//設定顏色
        this.mode = random(["happy","bad"])
        this.dead = false //代表活著，判斷是否死掉
        this.timenum = 0 //延長怪物死掉的時間，顯示怪物死掉後的畫面

    }
        draw(){//畫出元件
            if(this.dead == false ){
                push()//重新設定原點位置
                    translate(this.p.x,this.p.y)//把原點(0,0)座標移動到物件中心位置
                    scale(this.v.x<0?1:-1,-1)//if this.v.x<0?條件成立值為1，否則值為-1，魚鼻子向左邊就是1，右邊就是-1
                    fill(this.color)
                    noStroke()
                    beginShape()//魚頭
                        curveVertex(-1*this.r,2*this.r)
                        curveVertex(-3*this.r,0*this.r)
                        curveVertex(-1*this.r,-2*this.r)
                        curveVertex(-1*this.r,2*this.r)
                    endShape(CLOSE)
    
                    beginShape()//魚身
                        curveVertex(-1*this.r,2*this.r)
                        curveVertex(4*this.r,0*this.r)
                        curveVertex(-1*this.r,-2*this.r)
                        curveVertex(-1*this.r,2*this.r)
                    endShape(CLOSE)

                    beginShape()//魚尾
                        vertex(4*this.r,0*this.r)
                        vertex(6*this.r,2*this.r)
                        vertex(6*this.r,-2*this.r)
                        vertex(4*this.r,0*this.r)
                    endShape()
                    //ellipse(0,0,this.r)
                    // stroke(this.color)
                    // strokeWeight(4)
                    // line(this.r/2,0,this.r,0)//兩點畫一線
                    if(this.mode == "happy"){
                        fill(255)
                        ellipse(0,0,this.r)
                        fill(0)
                        ellipse(0,0,this.r/2)
                    }
                    else{
                        fill(255)
                        arc(0,0,this.r,this.r,0,PI)
                        fill(0)
                        arc(0,0,this.r/2,this.r/2,0,PI)
                    }

                pop()//把原點(0,0)座標移動到整個視窗的左上角
            }
            else{//怪物死掉畫面
                this.timenum = this.timenum + 1
                push()
                    translate(this.p.x,this.p.y)//把原點(0,0)座標移動到物件中心位置
                    scale(this.v.x<0?1:-1,-1)//if this.v.x<0?條件成立值為1，否則值為-1，魚鼻子向左邊就是1，右邊就是-1
                    fill(this.color)
                    noStroke()
                    beginShape()//魚頭
                        curveVertex(-1*this.r,2*this.r)
                        curveVertex(-3*this.r,0*this.r)
                        curveVertex(-1*this.r,-2*this.r)
                        curveVertex(-1*this.r,2*this.r)
                    endShape(CLOSE)
    
                    beginShape()//魚身
                        curveVertex(-1*this.r,2*this.r)
                        curveVertex(4*this.r,0*this.r)
                        curveVertex(-1*this.r,-2*this.r)
                        curveVertex(-1*this.r,2*this.r)
                    endShape(CLOSE)

                    beginShape()//魚尾
                        vertex(4*this.r,0*this.r)
                        vertex(6*this.r,2*this.r)
                        vertex(6*this.r,-2*this.r)
                        vertex(4*this.r,0*this.r)
                    endShape()
                    stroke(255)
                    line(-this.r/2, 0, this.r/2, 0)
                    
                pop()
            }
        }
        
        update(){//計算出移動元件後的位置
            this.p.add(this.v)
            //+++++++碰撞彈回+++++++++++++
            if (this.p.x<=0||this.p.x>=width)
            {
              this.v.x=-this.v.x
            }
            if (this.p.y<=0||this.p.y>=height)
            {
              this.v.y=-this.v.y
            }
        }
        //計算飛彈是否碰到怪物
        isBallInRanger(x,y){ //判斷飛彈的位置是否在怪物的範圍內 (x,y)為飛彈的座標
            let d =dist(x,y,this.p.x,this.p.y)//計算兩點（飛彈與物件中心點之間的距離）（this.p.x,this.p.y）為怪物的位置

            if (d<4*this.r){//去看作標點最大的值，一此作為方框的高與寬
            return true//飛彈與物件的距離小於物件的半徑代表碰觸到
            }else{
            return false//飛彈與物件的距離大於物件的半徑代表沒有碰觸到
            }
            }
            
}