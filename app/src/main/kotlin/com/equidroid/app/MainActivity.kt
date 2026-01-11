package com.equidroid.app

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.os.Message
import android.util.Log
import android.view.KeyEvent
import android.view.View
import android.view.WindowManager
import android.webkit.*
import android.widget.FrameLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.equidroid.app.core.EquicordInjector
import com.equidroid.app.core.SettingsManager
import com.equidroid.app.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var swipeRefresh: SwipeRefreshLayout
    private lateinit var settings: SettingsManager
    private lateinit var injector: EquicordInjector

    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private var customView: View? = null
    private var customViewCallback: WebChromeClient.CustomViewCallback? = null

    companion object {
        private const val TAG = "Equidroid"
        private const val DISCORD_URL = "https://discord.com/channels/@me"
        private const val DISCORD_LOGIN_URL = "https://discord.com/login"
        private val DISCORD_HOSTS = listOf(
            "discord.com",
            "canary.discord.com", 
            "ptb.discord.com",
            "discordapp.com"
        )
    }

    // File picker launcher
    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val clipData = result.data?.clipData
            val dataUri = result.data?.data
            
            val uris = when {
                clipData != null -> Array(clipData.itemCount) { clipData.getItemAt(it).uri }
                dataUri != null -> arrayOf(dataUri)
                else -> emptyArray()
            }
            fileUploadCallback?.onReceiveValue(uris)
        } else {
            fileUploadCallback?.onReceiveValue(null)
        }
        fileUploadCallback = null
    }

    // Permission launcher
    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        permissions.entries.forEach { entry ->
            Log.d(TAG, "Permission ${entry.key}: ${entry.value}")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize before setContentView
        settings = SettingsManager(this)
        injector = EquicordInjector(this)

        // Setup edge-to-edge display
        setupWindow()

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initViews()
        setupWebView()
        requestPermissions()

        // Load Discord
        val intentUrl = intent?.data?.toString()
        val urlToLoad = intentUrl ?: settings.getLastUrl() ?: DISCORD_URL
        webView.loadUrl(urlToLoad)

        Log.i(TAG, "Equidroid started - Loading: $urlToLoad")
    }

    private fun setupWindow() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        
        window.apply {
            statusBarColor = Color.TRANSPARENT
            navigationBarColor = Color.parseColor("#202225")
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                attributes.layoutInDisplayCutoutMode = 
                    WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
            }
        }

        WindowInsetsControllerCompat(window, window.decorView).apply {
            isAppearanceLightStatusBars = false
            isAppearanceLightNavigationBars = false
        }
    }

    private fun initViews() {
        webView = binding.webView
        progressBar = binding.progressBar
        swipeRefresh = binding.swipeRefresh

        swipeRefresh.setColorSchemeColors(
            Color.parseColor("#5865F2"),
            Color.parseColor("#EB459E"),
            Color.parseColor("#57F287")
        )
        swipeRefresh.setProgressBackgroundColorSchemeColor(Color.parseColor("#2f3136"))

        swipeRefresh.setOnRefreshListener {
            webView.reload()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        webView.apply {
            setBackgroundColor(Color.parseColor("#202225"))
            
            settings.apply {
                // JavaScript
                javaScriptEnabled = true
                javaScriptCanOpenWindowsAutomatically = true
                
                // DOM Storage
                domStorageEnabled = true
                databaseEnabled = true
                
                // Cache
                cacheMode = WebSettings.LOAD_DEFAULT
                
                // File Access
                allowFileAccess = true
                allowContentAccess = true
                
                // Media
                mediaPlaybackRequiresUserGesture = false
                
                // Display
                useWideViewPort = true
                loadWithOverviewMode = true
                builtInZoomControls = true
                displayZoomControls = false
                
                // Mixed Content
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                
                // User Agent - Fake as Chrome on Android
                userAgentString = buildUserAgent()
                
                // Other
                setSupportMultipleWindows(true)
                setGeolocationEnabled(false)
                
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    safeBrowsingEnabled = false
                }
            }

            // Enable third-party cookies
            CookieManager.getInstance().apply {
                setAcceptCookie(true)
                setAcceptThirdPartyCookies(webView, true)
            }

            // WebView Client
            webViewClient = EquidroidWebViewClient()
            
            // Chrome Client
            webChromeClient = EquidroidChromeClient()

            // JavaScript Interface for Equicord
            addJavascriptInterface(EquicordBridge(), "Android")

            // Download Listener
            setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
                handleDownload(url, userAgent, contentDisposition, mimeType)
            }
        }

        // Enable WebView debugging
        if (settings.isDebugMode()) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
    }

    private fun buildUserAgent(): String {
        val androidVersion = Build.VERSION.RELEASE
        val deviceModel = Build.MODEL
        val chromeVersion = "120.0.0.0"
        
        return "Mozilla/5.0 (Linux; Android $androidVersion; $deviceModel) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) " +
                "Chrome/$chromeVersion Mobile Safari/537.36"
    }

    private fun requestPermissions() {
        val permissions = mutableListOf<String>()
        
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) 
            != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.CAMERA)
        }
        
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) 
            != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.RECORD_AUDIO)
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        if (permissions.isNotEmpty()) {
            permissionLauncher.launch(permissions.toTypedArray())
        }
    }

    // ==================== WebView Client ====================

    inner class EquidroidWebViewClient : WebViewClient() {
        
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            val url = request?.url?.toString() ?: return false
            val host = request.url.host ?: return false

            // Allow Discord URLs
            if (DISCORD_HOSTS.any { host.contains(it) }) {
                return false
            }

            // Open external links in browser
            try {
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
            } catch (e: Exception) {
                Log.e(TAG, "Failed to open external URL: $url", e)
            }
            return true
        }

        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            progressBar.visibility = View.VISIBLE
            Log.d(TAG, "Page started: $url")
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            progressBar.visibility = View.GONE
            swipeRefresh.isRefreshing = false

            // Save last URL
            url?.let { settings.saveLastUrl(it) }

            // Inject Equicord
            if (settings.isEquicordEnabled() && isDiscordUrl(url)) {
                injector.inject(webView)
                Log.i(TAG, "Equicord injected into: $url")
            }

            Log.d(TAG, "Page finished: $url")
        }

        override fun onReceivedError(
            view: WebView?,
            request: WebResourceRequest?,
            error: WebResourceError?
        ) {
            super.onReceivedError(view, request, error)
            
            if (request?.isForMainFrame == true) {
                Log.e(TAG, "WebView error: ${error?.description}")
                // Could show error page here
            }
        }

        override fun onReceivedSslError(
            view: WebView?,
            handler: SslErrorHandler?,
            error: android.net.http.SslError?
        ) {
            // In production, you should show a dialog
            // For Discord, we proceed (they have valid SSL)
            handler?.proceed()
        }

        private fun isDiscordUrl(url: String?): Boolean {
            return url != null && DISCORD_HOSTS.any { url.contains(it) }
        }
    }

    // ==================== Chrome Client ====================

    inner class EquidroidChromeClient : WebChromeClient() {
        
        override fun onProgressChanged(view: WebView?, newProgress: Int) {
            progressBar.progress = newProgress
            if (newProgress == 100) {
                progressBar.visibility = View.GONE
            }
        }

        override fun onPermissionRequest(request: PermissionRequest?) {
            request?.let {
                // Auto-grant permissions for Discord (camera, microphone)
                runOnUiThread {
                    it.grant(it.resources)
                }
            }
        }

        // File Upload
        override fun onShowFileChooser(
            webView: WebView?,
            filePathCallback: ValueCallback<Array<Uri>>?,
            fileChooserParams: FileChooserParams?
        ): Boolean {
            fileUploadCallback?.onReceiveValue(null)
            fileUploadCallback = filePathCallback

            val intent = fileChooserParams?.createIntent()
            intent?.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)

            try {
                filePickerLauncher.launch(intent)
            } catch (e: Exception) {
                fileUploadCallback = null
                Toast.makeText(this@MainActivity, "Cannot open file chooser", Toast.LENGTH_SHORT).show()
                return false
            }
            return true
        }

        // Fullscreen video
        override fun onShowCustomView(view: View?, callback: CustomViewCallback?) {
            if (customView != null) {
                callback?.onCustomViewHidden()
                return
            }

            customView = view
            customViewCallback = callback

            binding.customViewContainer.apply {
                visibility = View.VISIBLE
                addView(view)
            }
            binding.webView.visibility = View.GONE

            // Hide system UI
            window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_FULLSCREEN or
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            )
        }

        override fun onHideCustomView() {
            if (customView == null) return

            binding.customViewContainer.apply {
                removeView(customView)
                visibility = View.GONE
            }
            binding.webView.visibility = View.VISIBLE

            customViewCallback?.onCustomViewHidden()
            customView = null
            customViewCallback = null

            // Show system UI
            window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        }

        // New Window (popups)
        override fun onCreateWindow(
            view: WebView?,
            isDialog: Boolean,
            isUserGesture: Boolean,
            resultMsg: Message?
        ): Boolean {
            val newWebView = WebView(this@MainActivity).apply {
                settings.javaScriptEnabled = true
            }
            
            val transport = resultMsg?.obj as? WebView.WebViewTransport
            transport?.webView = newWebView
            resultMsg?.sendToTarget()

            newWebView.webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(
                    view: WebView?,
                    request: WebResourceRequest?
                ): Boolean {
                    val url = request?.url?.toString() ?: return false
                    webView.loadUrl(url)
                    return true
                }
            }
            return true
        }

        // JavaScript Dialogs
        override fun onJsAlert(
            view: WebView?,
            url: String?,
            message: String?,
            result: JsResult?
        ): Boolean {
            AlertDialog.Builder(this@MainActivity)
                .setTitle("Alert")
                .setMessage(message)
                .setPositiveButton("OK") { _, _ -> result?.confirm() }
                .setOnCancelListener { result?.cancel() }
                .show()
            return true
        }

        override fun onJsConfirm(
            view: WebView?,
            url: String?,
            message: String?,
            result: JsResult?
        ): Boolean {
            AlertDialog.Builder(this@MainActivity)
                .setTitle("Confirm")
                .setMessage(message)
                .setPositiveButton("OK") { _, _ -> result?.confirm() }
                .setNegativeButton("Cancel") { _, _ -> result?.cancel() }
                .setOnCancelListener { result?.cancel() }
                .show()
            return true
        }

        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            Log.d("$TAG-Console", "${consoleMessage?.message()} -- ${consoleMessage?.sourceId()}:${consoleMessage?.lineNumber()}")
            return true
        }
    }

    // ==================== JavaScript Bridge ====================

    inner class EquicordBridge {
        
        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }

        @JavascriptInterface
        fun log(type: String, message: String) {
            when (type) {
                "error" -> Log.e("$TAG-JS", message)
                "warn" -> Log.w("$TAG-JS", message)
                "info" -> Log.i("$TAG-JS", message)
                else -> Log.d("$TAG-JS", message)
            }
        }

        @JavascriptInterface
        fun getSettings(): String {
            return settings.getEquicordSettings()
        }

        @JavascriptInterface
        fun saveSettings(json: String) {
            settings.saveEquicordSettings(json)
        }

        @JavascriptInterface
        fun openSettings() {
            runOnUiThread {
                startActivity(Intent(this@MainActivity, SettingsActivity::class.java))
            }
        }

        @JavascriptInterface
        fun getVersion(): String {
            return try {
                packageManager.getPackageInfo(packageName, 0).versionName ?: "1.0.0"
            } catch (e: Exception) {
                "1.0.0"
            }
        }

        @JavascriptInterface
        fun reload() {
            runOnUiThread {
                webView.reload()
            }
        }

        @JavascriptInterface
        fun clearCache() {
            runOnUiThread {
                webView.clearCache(true)
                Toast.makeText(this@MainActivity, "Cache cleared", Toast.LENGTH_SHORT).show()
            }
        }

        @JavascriptInterface
        fun vibrate(duration: Long) {
            val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as? android.os.Vibrator
            vibrator?.vibrate(duration)
        }
    }

    // ==================== Download Handler ====================

    private fun handleDownload(
        url: String,
        userAgent: String,
        contentDisposition: String,
        mimeType: String
    ) {
        try {
            val fileName = URLUtil.guessFileName(url, contentDisposition, mimeType)
            
            val request = DownloadManager.Request(Uri.parse(url)).apply {
                setMimeType(mimeType)
                addRequestHeader("User-Agent", userAgent)
                setTitle(fileName)
                setDescription("Downloading file...")
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
            }

            val downloadManager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            downloadManager.enqueue(request)

            Toast.makeText(this, "Downloading: $fileName", Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            Log.e(TAG, "Download failed", e)
            Toast.makeText(this, "Download failed", Toast.LENGTH_SHORT).show()
        }
    }

    // ==================== Lifecycle ====================

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (customView != null) {
                (webView.webChromeClient as? EquidroidChromeClient)?.onHideCustomView()
                return true
            }
            if (webView.canGoBack()) {
                webView.goBack()
                return true
            }
        }
        return super.onKeyDown(keyCo
