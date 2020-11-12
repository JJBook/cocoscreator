// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

// var Helloworld = require("Script.Helloworld")

@ccclass
export default class Player extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

     onLoad () {
         cc.log("================= onLoad")
     }

     @property
     playerName : string = "playerBtn"

    start () {

        var node = this.node
        node.x = 100

        var seq = cc.repeatForever(
             cc.sequence(
                 cc.moveBy(2, 200, 0),
                 cc.moveBy(2, -200, 0)
             ))
        this.node.runAction(seq)

        cc.log(this.node.getComponent(cc.Label) === this.getComponent(cc.Label))

        var label = this.getComponent(cc.Label)
        
        if (label) {
            label.string = "宝宝来找茬"
        } else {
            cc.error("Something wrong?");
        }

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function ( event ) {
          console.log('Hello click!');
        }, this);

        // // 使用函数绑定
        // this.node.on('mousedown', function ( event ) {
        //   console.log('Hello click2!');
        // }.bind(this));

        // 使用第三个参数
        // this.node.on('mousedown', function (event) {
        //   console.log('Hello click3!');
        // }, this);

        // 使用枚举类型来注册
        // this.node.enabled = true
        // node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
        //   console.log('Mouse down');
        // }, this);

        // // 使用事件名来注册
        // node.on('mousedown', function (event) {
        //   console.log('Mouse down');
        // }, this);
    }
    // update (dt) {}
}
