import React from 'react'
import 'firebaseui/dist/firebaseui.css'
import * as firebaseui from 'firebaseui'
const ELEMENT_ID = 'firebaseui_container'
let firebaseUiDeletion = Promise.resolve()


interface MyProps {
    uiConfig: Object
    firebaseAuth: Object
    uiCallback?: Function
    className?: String
}

export default class FirebaseAuth extends React.Component<MyProps> {
    uiConfig: any
    firebaseAuth: any
    className: any
    uiCallback: any
    unregisterAuthObserver: () => void
    firebaseUiWidget: any
    userSignedIn: boolean = false

    constructor(props) {
        super(props)
        this.uiConfig = props.uiConfig
        this.firebaseAuth = props.firebaseAuth
        this.className = props.className
        this.uiCallback = props.uiCallback
        this.unregisterAuthObserver = () => {}
    }

    componentDidMount() {
        // Wait in case the firebase UI instance is being deleted.
        // This can happen if you unmount/remount the element quickly.
        return firebaseUiDeletion.then(() => {
            this.firebaseUiWidget =
                firebaseui.auth.AuthUI.getInstance() ||
                new firebaseui.auth.AuthUI(this.firebaseAuth)
            if (this.uiConfig.signInFlow === 'popup') {
                this.firebaseUiWidget.reset()
            }

            // We track the auth state to reset firebaseUi if the user signs out.
            this.userSignedIn = false
            this.unregisterAuthObserver = this.firebaseAuth.onAuthStateChanged(
                user => {
                    if (!user && this.userSignedIn) {
                        this.firebaseUiWidget.reset()
                    }
                    this.userSignedIn = !!user
                }
            )
            if (this.uiCallback) {
                this.uiCallback(this.firebaseUiWidget)
            }
            this.firebaseUiWidget.start('#' + ELEMENT_ID, this.uiConfig)
        })
    }

    componentWillUnmount() {
        firebaseUiDeletion = firebaseUiDeletion.then(() => {
            this.unregisterAuthObserver()
            return this.firebaseUiWidget.delete()
        })
        return firebaseUiDeletion
    }
    render() {
        return <div className={this.className} id={ELEMENT_ID} />
    }
}
