package com.equidroid.app

import android.app.Application
import android.content.Context
import android.os.Build
import android.util.Log
import android.webkit.WebView
import androidx.multidex.MultiDex

/**
 * Equidroid Application class
 * Initializes app-wide configurations
 * Supports Android 4.4+ (API 20+)
 */
class EquidroidApp : Application() {
    
    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        // MultiDex cho API < 21
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            MultiDex.install(this)
        }
    }

    companion object {
        private const val TAG = "EquidroidApp"
        lateinit var instance: EquidroidApp
            private set
    }

    override fun onCreate() {
        super.onCreate()
        instance = this

        // Initialize WebView debugging in debug builds
        if (BuildConfig.DEBUG) {
            WebView.setWebContentsDebuggingEnabled(true)
            Log.d(TAG, "WebView debugging enabled")
        }

        Log.i(TAG, "Equidroid v${BuildConfig.VERSION_NAME} initialized")
    }
}
