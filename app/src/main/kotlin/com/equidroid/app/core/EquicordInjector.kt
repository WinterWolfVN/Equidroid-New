package com.equidroid.app.core

import android.content.Context
import android.util.Log
import android.webkit.WebView
import java.io.BufferedReader
import java.io.InputStreamReader

/**
 * Equicord Injector - Injects Equicord client mod into Discord WebView
 * Similar to Vendroid Enchanted's injection system
 */
class EquicordInjector(private val context: Context) {

    companion object {
        private const val TAG = "EquicordInjector"
        private const val INJECT_SCRIPT_FILE = "js/equicord-inject.js"
        private const val CSS_FILE = "css/equicord-styles.css"
        
        // Equicord CDN sources (fallback)
        private const val EQUICORD_RENDERER_URL = 
            "https://raw.githubusercontent.com/Equicord/Equicord/main/dist/renderer.js"
        private const val VENCORD_RENDERER_URL = 
            "https://raw.githubusercontent.com/Vendicated/Vencord/main/dist/renderer.js"
    }

    private var injectionScript: String? = null
    private var cssStyles: String? = null

    init {
        loadAssets()
    }

    /**
     * Load injection scripts from assets
     */
    private fun loadAssets() {
        try {
            // Load main injection script
            injectionScript = loadAsset(INJECT_SCRIPT_FILE)
            Log.i(TAG, "Loaded injection script: ${injectionScript?.length ?: 0} chars")

            // Load CSS
            cssStyles = loadAsset(CSS_FILE)
            Log.i(TAG, "Loaded CSS styles: ${cssStyles?.length ?: 0} chars")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to load assets", e)
        }
    }

    private fun loadAsset(fileName: String): String? {
        return try {
            context.assets.open(fileName).use { inputStream ->
                BufferedReader(InputStreamReader(inputStream)).use { reader ->
                    reader.readText()
                }
            }
        } catch (e: Exception) {
            Log.w(TAG, "Asset not found: $fileName")
            null
        }
    }

    /**
     * Inject Equicord into WebView
     */
    fun inject(webView: WebView) {
        // Build complete injection script
        val script = buildInjectionScript()
        
        // Execute in WebView
        webView.evaluateJavascript(script) { result ->
            Log.d(TAG, "Injection result: $result")
        }

        Log.i(TAG, "Equicord injection executed")
    }

    /**
     * Build the complete injection script
     */
    private fun buildInjectionScript(): String {
        val settings = SettingsManager(context)
        
        return """
            (function() {
                // Prevent multiple injections
                if (window.__EQUICORD_INJECTED__) {
                    console.log('[Equicord] Already injected, skipping...');
                    return;
                }
                window.__EQUICORD_INJECTED__ = true;
                
                console.log('[Equicord] Starting injection...');
                
                // ============ CONFIGURATION ============
                window.__EQUICORD_CONFIG__ = {
                    version: "${settings.getAppVersion()}",
                    debug: ${settings.isDebugMode()},
                    plugins: ${settings.getPluginsJson()},
                    customCSS: ${escapeForJS(settings.getCustomCSS())}
                };
                
                // ============ INJECT CSS ============
                ${buildCSSInjection()}
                
                // ============ WAIT FOR DISCORD ============
                function waitForDiscord(callback, maxAttempts = 100) {
                    let attempts = 0;
                    const check = () => {
                        attempts++;
                        if (typeof window.webpackChunkdiscord_app !== 'undefined' ||
                            document.querySelector('[class*="app-"]') ||
                            document.querySelector('[class*="layers-"]')) {
                            console.log('[Equicord] Discord detected after ' + attempts + ' attempts');
                            callback();
                            return;
                        }
                        if (attempts >= maxAttempts) {
                            console.warn('[Equicord] Discord detection timeout');
                            callback(); // Try anyway
                            return;
                        }
                        setTimeout(check, 100);
                    };
                    check();
                }
                
                // ============ MAIN INJECTION ============
                waitForDiscord(function() {
                    try {
                        // Inject main script
                        ${injectionScript ?: getDefaultInjectionScript()}
                        
                        console.log('[Equicord] Injection complete!');
                        
                        // Notify Android
                        if (window.Android && window.Android.log) {
                            window.Android.log('info', 'Equicord injected successfully');
                        }
                    } catch (error) {
                        console.error('[Equicord] Injection error:', error);
                        if (window.Android && window.Android.log) {
                            window.Android.log('error', 'Injection failed: ' + error.message);
                        }
                    }
                });
                
            })();
        """.trimIndent()
    }

    /**
     * Build CSS injection code
     */
    private fun buildCSSInjection(): String {
        val css = cssStyles ?: getDefaultCSS()
        val escapedCSS = escapeForJS(css)
        
        return """
            (function() {
                const style = document.createElement('style');
                style.id = 'equicord-styles';
                style.textContent = $escapedCSS;
                
                if (document.head) {
                    document.head.appendChild(style);
                } else {
                    document.addEventListener('DOMContentLoaded', function() {
                        document.head.appendChild(style);
                    });
                }
                console.log('[Equicord] CSS injected');
            })();
        """.trimIndent()
    }

    /**
     * Default injection script if asset not found
     */
    private fun getDefaultInjectionScript(): String {
        return """
            // ============ EQUICORD CORE ============
            window.Equicord = {
                version: window.__EQUICORD_CONFIG__.version,
                plugins: {},
                settings: window.__EQUICORD_CONFIG__,
                
                // Initialize
                init: function() {
                    console.log('[Equicord] Initializing v' + this.version);
                    this.loadPlugins();
                    this.createUI();
                    this.setupBridge();
                },
                
                // Load enabled plugins
                loadPlugins: function() {
                    const plugins = this.settings.plugins || {};
                    Object.keys(plugins).forEach(id => {
                        if (plugins[id]) {
                            this.enablePlugin(id);
                        }
                    });
                },
                
                // Enable a plugin
                enablePlugin: function(id) {
                    console.log('[Equicord] Enabling plugin: ' + id);
                    this.plugins[id] = { enabled: true };
                    // Plugin-specific logic would go here
                },
                
                // Create Floating UI
                createUI: function() {
                    const fab = document.createElement('div');
                    fab.id = 'equicord-fab';
                    fab.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
                    fab.style.cssText = 'position:fixed;bottom:80px;right:16px;width:48px;height:48px;background:linear-gradient(135deg,#5865F2,#EB459E);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:99999;transition:transform 0.2s;';
                    
                    fab.onclick = () => this.showMenu();
                    fab.onmouseover = () => fab.style.transform = 'scale(1.1)';
                    fab.onmouseout = () => fab.style.transform = 'scale(1)';
                    
                    document.body.appendChild(fab);
                },
                
                // Show quick menu
                showMenu: function() {
                    let menu = document.getElementById('equicord-menu');
                    if (menu) {
                        menu.remove();
                        return;
                    }
                    
                    menu = document.createElement('div');
                    menu.id = 'equicord-menu';
                    menu.style.cssText = 'position:fixed;bottom:140px;right:16px;background:#2f3136;border-radius:12px;padding:8px;box-shadow:0 8px 24px rgba(0,0,0,0.4);z-index:99998;min-width:180px;';
                    menu.innerHTML = `
                        <div style="padding:12px;border-bottom:1px solid #40444b;display:flex;align-items:center;gap:8px;">
                            <div style="width:32px;height:32px;background:linear-gradient(135deg,#5865F2,#EB459E);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                                <span style="color:white;font-weight:bold;">E</span>
                            </div>
                            <div>
                                <div style="color:#fff;font-weight:600;font-size:14px;">Equicord</div>
                                <div style="color:#b9bbbe;font-size:11px;">v` + this.version + `</div>
                            </div>
                        </div>
                        <div style="padding:4px 0;">
                            <div class="eq-menu-item" onclick="Equicord.openSettings()">⚙️ Cài đặt</div>
                            <div class="eq-menu-item" onclick="Equicord.showPlugins()">🧩 Plugins</div>
                            <div class="eq-menu-item" onclick="Equicord.reload()">🔄 Reload</div>
                        </div>
                    `;
                    
                    document.body.appendChild(menu);
                    
                    // Close on outside click
                    setTimeout(() => {
                        document.addEventListener('click', function close(e) {
                            if (!menu.contains(e.target) && e.target.id !== 'equicord-fab') {
                                menu.remove();
                                document.removeEventListener('click', close);
                            }
                        });
                    }, 100);
                },
                
                // Open settings via Android bridge
                openSettings: function() {
                    if (window.Android && window.Android.openSettings) {
                        window.Android.openSettings();
                    } else {
                        this.showToast('Settings not available');
                    }
                },
                
                // Show plugins
                showPlugins: function() {
                    this.showToast('Plugins: ' + Object.keys(this.plugins).length + ' loaded');
                },
                
                // Reload page
                reload: function() {
                    this.showToast('Reloading...');
                    setTimeout(() => location.reload(), 500);
                },
                
                // Toast notification
                showToast: function(message) {
                    if (window.Android && window.Android.showToast) {
                        window.Android.showToast(message);
                    } else {
                        const toast = document.createElement('div');
                        toast.style.cssText = 'position:fixed;bottom:140px;left:50%;transform:translateX(-50%);background:#36393f;color:#fff;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:100000;animation:fadeIn 0.3s;';
                        toast.textContent = message;
                        document.body.appendChild(toast);
                        setTimeout(() => toast.remove(), 2500);
                    }
                },
                
                // Setup Android bridge
                setupBridge: function() {
                    window.addEventListener('message', (e) => {
                        if (e.data && e.data.type === 'equicord') {
                            this.handleMessage(e.data);
                        }
                    });
                },
                
                handleMessage: function(data) {
                    console.log('[Equicord] Message:', data);
                }
            };
            
            // Initialize Equicord
            Equicord.init();
        """.trimIndent()
    }

    /**
     * Default CSS styles
     */
    private fun getDefaultCSS(): String {
        return """
            /* Equicord Styles */
            
            /* Custom Scrollbar */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            /* Menu Item Styles */
            .eq-menu-item {
                padding: 10px 12px;
                color: #dcddde;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
            }
            .eq-menu-item:hover {
                background: #40444b;
            }
            
            /* Toast Animation */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            
            /* Message Hover Effect */
            [class*="message-"]:hover {
                background: rgba(79, 84, 92, 0.2) !important;
            }
            
            /* Better Code Blocks */
            [class*="codeBlock-"] {
                background: #1e1e2e !important;
            }
        """.trimIndent()
    }

    /**
     * Escape string for JavaScript
     */
    private fun escapeForJS(str: String?): String {
        if (str == null) return "''"
        
        val escaped = str
            .replace("\\", "\\\\")
            .replace("'", "\\'")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
        
        return "'$escaped'"
    }

    /**
     * Re-inject (for settings changes)
     */
    fun reinject(webView: WebView) {
        // Clear injection flag first
        webView.evaluateJavascript("window.__EQUICORD_INJECTED__ = false;", null)
        
        // Then re-inject
        inject(webView)
    }
}
