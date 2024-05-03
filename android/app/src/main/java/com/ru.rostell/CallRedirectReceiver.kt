package ru.rostell

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.telephony.TelephonyManager
import com.facebook.react.bridge.ReactMethod

class CallRedirectReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action == TelephonyManager.ACTION_PHONE_STATE_CHANGED) {
            val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
            if (state == TelephonyManager.EXTRA_STATE_RINGING) {
                val forwardingNumber = "+1234567890" // Замените на нужный номер
                val redirectIntent = Intent(Intent.ACTION_CALL)
                redirectIntent.data = Uri.parse("tel:$forwardingNumber")
                redirectIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                context?.startActivity(redirectIntent)
            }
        }
    }
}
