// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Integer)
    private jumpHeight : number = 0

    @property(cc.Integer)
    private jumpDuration : number = 0

    @property(cc.Integer)
    private maxMoveSpeed : number = 0

    @property(cc.Integer)
    private accel : number = 0

    @property({ type    : cc.AudioClip })
    private jumpAudio : cc.AudioClip = null

    private xSpeed : number = 0
    private accLeft : boolean = false
    private accRight : boolean = false
    private jumpAction : cc.Action = null

    onLoad () {
        this.jumpAction = this.getJumpAction()
        this.node.runAction(this.jumpAction)

        this.accLeft = false
        this.accRight = false

        this.xSpeed = 0

        this.addEventListeners()
    }

    update (dt : number) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }

        this.node.x += this.xSpeed * dt
        
        if (this.node.x <= -this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2
        }

        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2
        }
    }

    start () {

    }

    private getJumpAction () {
        let jumpUp = cc.moveBy(this.jumpDuration, 0, this.jumpHeight).easing(cc.easeCubicActionOut())
        let jumpDown = cc.moveBy(this.jumpDuration, 0, -this.jumpHeight).easing(cc.easeCubicActionIn())
        let callback = cc.callFunc(this.playJumpEffect, this)
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback))
    }

    private playJumpEffect () {
        cc.audioEngine.play(this.jumpAudio as any, false, 1)
    }

    private addEventListeners () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd,this);
    }

    private moveLeft () {
        this.accLeft = true
        this.accRight = false
    }

    private moveRight () {
        this.accLeft = false
        this.accRight = true
    }

    private stopMove () {
        this.accLeft = false
        this.accRight = false
    }

    private onScreenTouchStart(event: cc.Event.EventTouch) {
        if (event.getLocationX() > cc.winSize.width / 2) {
            this.moveRight()
        } else {
            this.moveLeft()
        }
    }

    private onScreenTouchEnd () {
        this.stopMove()
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        switch ((event as any).keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight();
                break;
        }
    }

    private onKeyUp(event: cc.Event.EventKeyboard) {
        switch ((event as any).keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.stopMove();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.stopMove();
                break;
        }
    }
}
