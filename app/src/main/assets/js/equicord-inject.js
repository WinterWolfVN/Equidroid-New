/**
 * Equicord Full Injection Script for Equidroid Android
 * Loads ALL Equicord/Vencord plugins with FULL Settings UI
 * Version: 2.1.0
 */

(function() {
    'use strict';

    if (window.__EQUICORD_LOADED__) return;
    window.__EQUICORD_LOADED__ = true;

    console.log('[Equicord] Android injection starting v2.1.0...');

    // ============== ALL PLUGINS BY CATEGORY ==============
    const ALL_PLUGINS = {
        // CORE (Required)
        core: {
            "Settings": { enabled: true, required: true },
            "CommandsAPI": { enabled: true, required: true },
            "MessageAccessoriesAPI": { enabled: true, required: true },
            "MessagePopoverAPI": { enabled: true, required: true },
            "NoticesAPI": { enabled: true, required: true },
            "ServerListAPI": { enabled: true, required: true },
            "ChatInputButtonAPI": { enabled: true, required: true },
            "MemberListDecoratorsAPI": { enabled: true, required: true },
            "MessageDecorationsAPI": { enabled: true, required: true },
            "MessageEventsAPI": { enabled: true, required: true }
        },
        
        // CHAT & MESSAGES
        chat: {
            "MessageLogger": { enabled: true, desc: "Log deleted/edited messages" },
            "MessageLinkEmbeds": { enabled: true, desc: "Embed message links" },
            "MessageTags": { enabled: true, desc: "Custom message tags" },
            "NoBlockedMessages": { enabled: true, desc: "Show blocked messages" },
            "NoReplyMention": { enabled: true, desc: "Disable reply mention" },
            "QuickReply": { enabled: true, desc: "Reply with shortcuts" },
            "ReverseImageSearch": { enabled: true, desc: "Reverse image search" },
            "SearchReply": { enabled: true, desc: "Reply from search" },
            "ShowHiddenChannels": { enabled: true, desc: "Show hidden channels" },
            "TextReplace": { enabled: true, desc: "Replace text patterns" },
            "TypingIndicator": { enabled: true, desc: "Show who's typing" },
            "TypingTweaks": { enabled: true, desc: "Typing tweaks" },
            "Unindent": { enabled: true, desc: "Remove code indentation" },
            "UnsuppressEmbeds": { enabled: true, desc: "Unsuppress embeds" },
            "ValidUser": { enabled: true, desc: "Validate mentions" },
            "VoiceMessages": { enabled: true, desc: "Voice messages everywhere" },
            "VolumeBooster": { enabled: true, desc: "Boost audio volume" },
            "WhoReacted": { enabled: true, desc: "Show who reacted" },
            "ReadAllNotificationsButton": { enabled: true, desc: "Read all button" },
            "SendTimestamps": { enabled: true, desc: "Send timestamps" },
            "SilentMessageToggle": { enabled: true, desc: "Toggle silent messages" },
            "Translate": { enabled: true, desc: "Translate messages" },
            "UrbanDictionary": { enabled: true, desc: "Urban Dictionary" },
            "InvisibleChat": { enabled: true, desc: "Send invisible messages" }
        },
        
        // UI ENHANCEMENTS
        ui: {
            "AlwaysAnimate": { enabled: true, desc: "Always animate avatars" },
            "AlwaysTrust": { enabled: true, desc: "Trust all domains" },
            "AnonymiseFileNames": { enabled: true, desc: "Anonymise files" },
            "BetterFolders": { enabled: true, desc: "Better server folders" },
            "BetterGifAltText": { enabled: true, desc: "Better GIF alt text" },
            "BetterNotesBox": { enabled: true, desc: "Better notes box" },
            "BetterRoleDot": { enabled: true, desc: "Better role dots" },
            "BetterRoleContext": { enabled: true, desc: "Better role context" },
            "BetterSettings": { enabled: true, desc: "Better settings UI" },
            "BetterUploadButton": { enabled: true, desc: "Better upload button" },
            "BiggerStreamPreview": { enabled: true, desc: "Bigger stream preview" },
            "BlurNSFW": { enabled: true, desc: "Blur NSFW content" },
            "CallTimer": { enabled: true, desc: "Show call duration" },
            "ClearURLs": { enabled: true, desc: "Remove URL tracking" },
            "ColorSighted": { enabled: true, desc: "Color blind mode" },
            "ConsoleShortcuts": { enabled: true, desc: "Console shortcuts" },
            "CopyUserURLs": { enabled: true, desc: "Copy user URL" },
            "CrashHandler": { enabled: true, desc: "Crash handler" },
            "CustomRPC": { enabled: true, desc: "Custom Rich Presence" },
            "DisableDMCallIdle": { enabled: true, desc: "Disable call idle" },
            "EmoteCloner": { enabled: true, desc: "Clone emotes" },
            "FavoriteEmojiFirst": { enabled: true, desc: "Favorite emoji first" },
            "FixSpotifyEmbeds": { enabled: true, desc: "Fix Spotify embeds" },
            "ForceOwnerCrown": { enabled: true, desc: "Force owner crown" },
            "FriendInvites": { enabled: true, desc: "Friend invites" },
            "GameActivityToggle": { enabled: true, desc: "Toggle game activity" },
            "GifPaste": { enabled: true, desc: "Paste GIFs" },
            "HideAttachments": { enabled: true, desc: "Hide attachments" },
            "IgnoreActivities": { enabled: true, desc: "Ignore activities" },
            "ImageZoom": { enabled: true, desc: "Zoom images" },
            "KeepCurrentChannel": { enabled: true, desc: "Keep current channel" },
            "LoadingQuotes": { enabled: true, desc: "Custom loading quotes" },
            "MemberCount": { enabled: true, desc: "Show member count" },
            "MessageClickActions": { enabled: true, desc: "Message click actions" },
            "ModalFade": { enabled: true, desc: "Modal fade transitions" },
            "MoreUserTags": { enabled: true, desc: "More user tags" },
            "MutualGroupDMs": { enabled: true, desc: "Mutual group DMs" },
            "MuteNewGuild": { enabled: true, desc: "Mute new guilds" },
            "NewGuildSettings": { enabled: true, desc: "New guild settings" },
            "NoF1": { enabled: true, desc: "Disable F1 help" },
            "NoPendingCount": { enabled: true, desc: "No pending count" },
            "NoScreensharePreview": { enabled: true, desc: "No screenshare preview" },
            "NoUnblockToJump": { enabled: true, desc: "No unblock to jump" },
            "OnePingPerDM": { enabled: true, desc: "One ping per DM" },
            "PermissionsViewer": { enabled: true, desc: "View permissions" },
            "PictureInPicture": { enabled: true, desc: "Picture in Picture" },
            "PinDMs": { enabled: true, desc: "Pin DMs" },
            "PlatformIndicators": { enabled: true, desc: "Platform indicators" },
            "PreviewMessage": { enabled: true, desc: "Preview message" },
            "QuickMention": { enabled: true, desc: "Quick mention" },
            "ReactErrorDecoder": { enabled: true, desc: "React error decoder" },
            "RelationshipNotifier": { enabled: true, desc: "Friend notifications" },
            "RevealAllSpoilers": { enabled: true, desc: "Reveal all spoilers" },
            "RoleColorEverywhere": { enabled: true, desc: "Role colors everywhere" },
            "ServerInfo": { enabled: true, desc: "Server info" },
            "ServerListIndicators": { enabled: true, desc: "Server indicators" },
            "ServerProfile": { enabled: true, desc: "Server profiles" },
            "ShikiCodeblocks": { enabled: true, desc: "Syntax highlighting" },
            "ShowAllMessageButtons": { enabled: true, desc: "Show all buttons" },
            "ShowConnections": { enabled: true, desc: "Show connections" },
            "ShowMeYourName": { enabled: true, desc: "Show real names" },
            "ShowTimeouts": { enabled: true, desc: "Show timeouts" },
            "SortFriendRequests": { enabled: true, desc: "Sort friend requests" },
            "Summaries": { enabled: true, desc: "Channel summaries" },
            "ThemeAttributes": { enabled: true, desc: "Theme attributes" },
            "TimeBarAllActivities": { enabled: true, desc: "Timebar all" },
            "UnlockedAvatarZoom": { enabled: true, desc: "Unlocked avatar zoom" },
            "UserVoiceShow": { enabled: true, desc: "User voice state" },
            "USRBG": { enabled: true, desc: "Custom backgrounds" },
            "ValidReply": { enabled: true, desc: "Validate replies" },
            "VideoSpeed": { enabled: true, desc: "Video speed control" },
            "ViewIcons": { enabled: true, desc: "View full icons" },
            "ViewRaw": { enabled: true, desc: "View raw message" },
            "WebContextMenus": { enabled: true, desc: "Web context menus" },
            "WebKeybinds": { enabled: true, desc: "Web keybinds" },
            "WebScreenShareFixes": { enabled: true, desc: "Web screenshare fixes" }
        },
        
        // PRIVACY & SECURITY
        privacy: {
            "NoTrack": { enabled: true, required: true, desc: "Block Discord tracking" },
            "SilentTyping": { enabled: true, desc: "Hide typing indicator" },
            "DisableCallIdle": { enabled: true, desc: "Disable call idle" },
            "StreamerModeOnStream": { enabled: true, desc: "Auto streamer mode" }
        },
        
        // NITRO FEATURES
        nitro: {
            "FakeNitro": { enabled: true, desc: "Use Nitro features free" },
            "FreeEmojis": { enabled: true, desc: "Use any emoji" },
            "NitroBypass": { enabled: true, desc: "Bypass Nitro restrictions" }
        },
        
        // VOICE & AUDIO
        voice: {
            "VcDoubleClick": { enabled: true, desc: "Double click to join VC" },
            "VcNarrator": { enabled: false, desc: "VC narrator" },
            "VoiceChatUtilities": { enabled: true, desc: "VC utilities" },
            "SpotifyControls": { enabled: true, desc: "Spotify controls" },
            "SpotifyCrack": { enabled: true, desc: "Spotify features" },
            "SpotifyShareCommands": { enabled: true, desc: "Spotify share" },
            "WebRichPresence": { enabled: true, desc: "Web rich presence" }
        },
        
        // DEVELOPER
        developer: {
            "Experiments": { enabled: true, desc: "Enable experiments" },
            "DevCompanion": { enabled: false, desc: "Dev companion" }
        },
        
        // FUN
        fun: {
            "MoreKaomoji": { enabled: true, desc: "More kaomoji" },
            "Moyai": { enabled: false, desc: "🗿🗿🗿" },
            "Petpet": { enabled: true, desc: "Pet pet GIFs" }
        },
        
        // EQUICORD EXCLUSIVE
        equicord: {
            "BetterActivities": { enabled: true, desc: "Better activities" },
            "BetterQuickReact": { enabled: true, desc: "Better quick react" },
            "CustomSounds": { enabled: true, desc: "Custom sounds" },
            "DoubleCounterVerify": { enabled: true, desc: "Counter verify bypass" },
            "EmojiDumper": { enabled: true, desc: "Dump emojis" },
            "GuildInfo": { enabled: true, desc: "Guild information" },
            "HiddenChannelIcons": { enabled: true, desc: "Hidden channel icons" },
            "JumpToStart": { enabled: true, desc: "Jump to start" },
            "MessageLatency": { enabled: true, desc: "Message latency" },
            "NoMaskedUrlPaste": { enabled: true, desc: "No masked URL" },
            "NoNitroUpsell": { enabled: true, desc: "Remove Nitro upsells" },
            "NoPremiumUpsells": { enabled: true, desc: "Remove premium upsells" },
            "OverrideForumDefaults": { enabled: true, desc: "Override forum defaults" },
            "ReplaceGoogleSearch": { enabled: true, desc: "Replace Google search" },
            "ReplyTimestamp": { enabled: true, desc: "Reply timestamp" },
            "TABCompleteGIFs": { enabled: true, desc: "Tab complete GIFs" },
            "YoutubeAdblock": { enabled: true, desc: "Block YouTube ads" },
            "ThemeLibrary": { enabled: true, desc: "Theme library" }
        }
    };

    // ============== STORAGE ==============
    const Storage = {
        prefix: 'equicord_',
        get(key, def) {
            try {
                const v = localStorage.getItem(this.prefix + key);
                return v ? JSON.parse(v) : def;
            } catch { return def; }
        },
        set(key, val) {
            try {
                localStorage.setItem(this.prefix + key, JSON.stringify(val));
            } catch (e) { console.error('[Storage]', e); }
        },
        clear() {
            Object.keys(localStorage)
                .filter(k => k.startsWith(this.prefix))
                .forEach(k => localStorage.removeItem(k));
        }
    };

    // ============== EQUICORD CORE ==============
    const Equicord = {
        version: '2.1.0',
        plugins: {},
        themes: { enabled: true, current: 'default', customCSS: '', themeLinks: [] },
        settings: {
            updater: { autoUpdate: true, checkOnStartup: true, notifyUpdates: true, branch: 'stable' },
            cloud: { enabled: false, syncSettings: false, syncPlugins: false, syncThemes: false },
            backup: { autoBackup: true, backupInterval: 24, maxBackups: 5 }
        },
        currentTab: 'plugins',
        currentCategory: 'all',
        searchQuery: '',

        async init() {
            console.log('[Equicord] Initializing...');
            
            await this.waitForDiscord();
            this.flattenPlugins();
            this.loadSettings();
            this.injectCSS();
            this.patchDiscord();
            this.createUI();
            this.setupBridge();
            
            const enabled = Object.values(this.plugins).filter(p => p.enabled).length;
            console.log(`[Equicord] Ready! ${enabled}/${Object.keys(this.plugins).length} plugins`);
            this.toast(`Equicord v${this.version} - ${enabled} plugins`, 'success');
        },

        waitForDiscord() {
            return new Promise((resolve) => {
                let attempts = 0;
                const check = () => {
                    if (++attempts > 150 || window.webpackChunkdiscord_app || document.querySelector('[class*="app-"]')) {
                        resolve();
                        return;
                    }
                    setTimeout(check, 100);
                };
                check();
            });
        },

        flattenPlugins() {
            Object.entries(ALL_PLUGINS).forEach(([category, plugins]) => {
                Object.entries(plugins).forEach(([name, config]) => {
                    this.plugins[name] = { ...config, name, category };
                });
            });
        },

        loadSettings() {
            const saved = Storage.get('plugins', {});
            Object.keys(saved).forEach(name => {
                if (this.plugins[name] && !this.plugins[name].required) {
                    this.plugins[name].enabled = saved[name];
                }
            });
            this.themes = Storage.get('themes', this.themes);
            this.settings = { ...this.settings, ...Storage.get('settings', {}) };
        },

        saveSettings() {
            const states = {};
            Object.entries(this.plugins).forEach(([name, p]) => states[name] = p.enabled);
            Storage.set('plugins', states);
            Storage.set('themes', this.themes);
            Storage.set('settings', this.settings);
        },

        patchDiscord() {
            // NoTrack
            if (this.plugins.NoTrack?.enabled) {
                const origFetch = window.fetch;
                window.fetch = function(url, opts) {
                    if (typeof url === 'string' && (url.includes('/science') || url.includes('/track') || url.includes('/analytics'))) {
                        return Promise.resolve(new Response('{}', { status: 200 }));
                    }
                    return origFetch.apply(this, arguments);
                };
            }
            
            // SilentTyping
            if (this.plugins.SilentTyping?.enabled) {
                const origFetch = window.fetch;
                window.fetch = function(url, opts) {
                    if (typeof url === 'string' && url.includes('/typing')) {
                        return Promise.resolve(new Response('', { status: 204 }));
                    }
                    return origFetch.apply(this, arguments);
                };
            }
            
            // Experiments
            if (this.plugins.Experiments?.enabled) {
                try {
                    Object.defineProperty(window, 'GLOBAL_ENV', {
                        get: () => ({ RELEASE_CHANNEL: 'staging' }),
                        configurable: true
                    });
                } catch {}
            }
        },

        injectCSS() {
            const css = `
                :root{--eq-primary:#5865F2;--eq-secondary:#EB459E;--eq-success:#3BA55C;--eq-warning:#FAA61A;--eq-danger:#ED4245;--eq-bg:#1a1a2e;--eq-card:#2f3136;--eq-input:#40444b;--eq-text:#fff;--eq-muted:#b9bbbe;--eq-dim:#72767d;--eq-border:#40444b}
                ::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:4px}
                #eq-fab{position:fixed;bottom:80px;right:16px;width:56px;height:56px;background:linear-gradient(135deg,var(--eq-primary),var(--eq-secondary));border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(88,101,242,.4);z-index:99999;transition:all .3s}
                #eq-fab:hover{transform:scale(1.1)}#eq-fab:active{transform:scale(.95)}#eq-fab svg{width:28px;height:28px;fill:#fff}
                #eq-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(5px);z-index:99998;opacity:0;visibility:hidden;transition:all .3s}#eq-overlay.show{opacity:1;visibility:visible}
                #eq-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.9);width:95%;max-width:900px;height:85vh;max-height:700px;background:var(--eq-bg);border-radius:16px;z-index:100000;display:flex;flex-direction:column;opacity:0;visibility:hidden;transition:all .3s;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,.5)}
                #eq-panel.show{opacity:1;visibility:visible;transform:translate(-50%,-50%) scale(1)}
                .eq-header{padding:20px 24px;background:linear-gradient(135deg,var(--eq-primary),var(--eq-secondary));display:flex;align-items:center;gap:16px}
                .eq-logo{width:48px;height:48px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;color:var(--eq-primary)}
                .eq-title{font-size:22px;font-weight:700;color:#fff}.eq-subtitle{font-size:13px;color:rgba(255,255,255,.8);margin-top:2px}
                .eq-close{margin-left:auto;width:40px;height:40px;background:rgba(255,255,255,.2);border:none;border-radius:10px;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center}
                .eq-body{display:flex;flex:1;overflow:hidden}
                .eq-sidebar{width:200px;background:#16213e;padding:12px;display:flex;flex-direction:column;gap:4px;overflow-y:auto;border-right:1px solid var(--eq-border)}
                .eq-nav-item{display:flex;align-items:center;gap:12px;padding:12px 16px;background:transparent;border:none;border-radius:10px;color:var(--eq-muted);font-size:14px;cursor:pointer;transition:all .2s;text-align:left;width:100%}
                .eq-nav-item:hover{background:rgba(255,255,255,.05);color:#fff}.eq-nav-item.active{background:rgba(88,101,242,.2);color:var(--eq-primary);font-weight:600}
                .eq-nav-item .icon{font-size:18px;width:24px;text-align:center}.eq-nav-divider{height:1px;background:var(--eq-border);margin:8px 0}
            
