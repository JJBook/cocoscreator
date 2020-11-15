// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeBtn extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    safeTime: {
        default: 0.5,
        tooltip: "按钮保护时间，指定间隔内只能点击一次."
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // var Sprite = cc.Class({
        //     name: "sprite",
        //     ctor: function() {
        //         cc.log(this instanceof Sprite)
        //     },
        //     print: function(){
                
        //     },
        // })

        // var obj = new Sprite()
        // cc.log(obj instanceof Sprite)
        // var Shape = cc.Class({
        //     ctor: function(){
        //         cc.log("Shape")
        //     }
        // })
        // var Rect = cc.Class({
        //     extends: Shape
        // })
        // var Square = cc.Class({
        //     extends: Rect,
        //     ctor: function(){
        //         cc.log("Square")
        //     }
        // })
        let button = this.getComponent(cc.Button);
        console.log(button)
        if (!button){
            return;
        }
        button.enabled = false
    }

    bindTouch() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function ( event ) {
            console.log('Hello click!');
        }, this);
    }

    // update (dt) {}
}
