/**
 * Equicord Full Injection Script for Equidroid
 * Loads ALL Equicord/Vencord plugins with FULL Settings UI
 * Version: 2.1.0
 * 
 * 📁 FILE LOCATION:
 * - PWA (Web): /equicord-inject.js (root folder)
 * - Android: /app/src/main/assets/js/equicord-inject.js
 * 
 * Cả 2 file này GIỐNG NHAU về nội dung!
 */

(function() {
    'use strict';

    if (window.__EQUICORD_LOADED__) return;
    window.__EQUICORD_LOADED__ = true;

    console.log('[Equicord] Starting full injection v2.1.0...');

    // ============== CONFIGURATION ==============
    const EQUICORD_CONFIG = {
        version: "2.1.0",
        
        // CDN Sources
        sources: {
            equicord: "https://raw.githubusercontent.com/Equicord/Equicord/main/dist/browser.js",
            vencord: "https://raw.githubusercontent.com/Vendicated/Vencord/main/dist/browser.js",
            equicordCSS: "https://raw.githubusercontent.com/Equicord/Equicord/main/dist/browser.css"
        },
        
        // All Plugins organized by category
        plugins: {
            // ============ CORE ============
            core: {
                "Settings": { enabled: true, required: true, description: "Equicord Settings Panel" },
                "CommandsAPI": { enabled: true, required: true, description: "API for slash commands" },
                "MessageAccessoriesAPI": { enabled: true, required: true, description: "API for message accessories" },
                "MessagePopoverAPI": { enabled: true, required: true, description: "API for message popovers" },
                "NoticesAPI": { enabled: true, required: true, description: "API for notices" },
                "ServerListAPI": { enabled: true, required: true, description: "API for server list" },
                "ChatInputButtonAPI": { enabled: true, required: true, description: "API for chat input buttons" },
                "MemberListDecoratorsAPI": { enabled: true, required: true, description: "API for member list decorators" },
                "MessageDecorationsAPI": { enabled: true, required: true, description: "API for message decorations" },
                "MessageEventsAPI": { enabled: true, required: true, description: "API for message events" },
                "UserSettingsAPI": { enabled: true, required: true, description: "API for user settings" }
            },
            
            // ============ CHAT & MESSAGES ============
            chat: {
                "MessageLogger": { enabled: true, description: "Logs deleted and edited messages", settings: { deleteStyle: "text", ignoreBots: false, ignoreSelf: false, collapseDeleted: false } },
                "MessageLinkEmbeds": { enabled: true, description: "Embeds message links in chat" },
                "MessageTags": { enabled: true, description: "Custom tags for messages" },
                "NoBlockedMessages": { enabled: true, description: "Shows blocked messages" },
                "NoReplyMention": { enabled: true, description: "Disables reply mention by default" },
                "QuickReply": { enabled: true, description: "Reply using keyboard shortcuts" },
                "ReverseImageSearch": { enabled: true, description: "Reverse image search on images" },
                "SearchReply": { enabled: true, description: "Reply from search results" },
                "ShowHiddenChannels": { enabled: true, description: "Shows hidden channels", settings: { showMode: "muted", hideUnreads: true, showDescription: true } },
                "TextReplace": { enabled: true, description: "Replace text patterns" },
                "TypingIndicator": { enabled: true, description: "Shows who is typing" },
                "TypingTweaks": { enabled: true, description: "Typing indicator tweaks" },
                "Unindent": { enabled: true, description: "Removes code block indentation" },
                "UnsuppressEmbeds": { enabled: true, description: "Unsuppress embeds" },
                "ValidUser": { enabled: true, description: "Validates user mentions" },
                "VoiceMessages": { enabled: true, description: "Voice messages everywhere" },
                "VolumeBooster": { enabled: true, description: "Boost audio volume", settings: { maxVolume: 300 } },
                "WhoReacted": { enabled: true, description: "Shows who reacted" },
                "NoTypingAnimation": { enabled: false, description: "Disables typing animation" },
                "ReadAllNotificationsButton": { enabled: true, description: "Adds read all button" },
                "SendTimestamps": { enabled: true, description: "Send Discord timestamps" },
                "SilentMessageToggle": { enabled: true, description: "Toggle silent messages" },
                "SilentTyping": { enabled: true, description: "Hide your typing indicator", settings: { showIcon: true } },
                "Translate": { enabled: true, description: "Translate messages" },
                "UrbanDictionary": { enabled: true, description: "Urban Dictionary lookup" },
                "InvisibleChat": { enabled: true, description: "Send invisible messages" }
            },
            
            // ============ UI ENHANCEMENTS ============
            ui: {
                "AlwaysAnimate": { enabled: true, description: "Always animate avatars/emojis" },
                "AlwaysTrust": { enabled: true, description: "Trust all domains" },
                "AnonymiseFileNames": { enabled: true, description: "Anonymise file names" },
                "BetterFolders": { enabled: true, description: "Better server folders", settings: { sidebar: true, closeAllFolders: false, showFolderIcon: true } },
                "BetterGifAltText": { enabled: true, description: "Better GIF alt text" },
                "BetterNotesBox": { enabled: true, description: "Better notes box" },
                "BetterRoleDot": { enabled: true, description: "Better role dots" },
                "BetterRoleContext": { enabled: true, description: "Better role context menu" },
                "BetterSettings": { enabled: true, description: "Better settings UI" },
                "BetterUploadButton": { enabled: true, description: "Better upload button" },
                "BiggerStreamPreview": { enabled: true, description: "Bigger stream preview" },
                "BlurNSFW": { enabled: true, description: "Blur NSFW content", settings: { blurAmount: 10 } },
                "CallTimer": { enabled: true, description: "Shows call duration" },
                "ClearURLs": { enabled: true, description: "Removes tracking from URLs" },
                "ColorSighted": { enabled: true, description: "Color blind mode" },
                "ConsoleShortcuts": { enabled: true, description: "Console shortcuts" },
                "CopyUserURLs": { enabled: true, description: "Copy user profile URL" },
                "CrashHandler": { enabled: true, description: "Crash handler" },
                "CustomRPC": { enabled: true, description: "Custom Rich Presence" },
                "DisableDMCallIdle": { enabled: true, description: "Disable DM call idle" },
                "EmoteCloner": { enabled: true, description: "Clone emotes easily" },
                "FavoriteEmojiFirst": { enabled: true, description: "Favorite emoji first" },
                "FavoriteGifSearch": { enabled: true, description: "Favorite GIF search" },
                "FixSpotifyEmbeds": { enabled: true, description: "Fix Spotify embeds" },
                "ForceOwnerCrown": { enabled: true, description: "Force owner crown" },
                "FriendInvites": { enabled: true, description: "Friend invites" },
                "GameActivityToggle": { enabled: true, description: "Toggle game activity" },
                "GifPaste": { enabled: true, description: "Paste GIFs" },
                "GreetStickerPicker": { enabled: true, description: "Greet sticker picker" },
                "HideAttachments": { enabled: true, description: "Hide attachments" },
                "IgnoreActivities": { enabled: true, description: "Ignore activities" },
                "ImageZoom": { enabled: true, description: "Zoom images", settings: { zoomSpeed: 0.5, nearestNeighbour: false } },
                "KeepCurrentChannel": { enabled: true, description: "Keep current channel" },
                "LoadingQuotes": { enabled: true, description: "Custom loading quotes" },
                "MemberCount": { enabled: true, description: "Show member count" },
                "MessageClickActions": { enabled: true, description: "Message click actions" },
                "ModalFade": { enabled: true, description: "Fade modal transitions" },
                "MoreUserTags": { enabled: true, description: "More user tags" },
                "MutualGroupDMs": { enabled: true, description: "Mutual group DMs" },
                "MuteNewGuild": { enabled: true, description: "Mute new guilds" },
                "NewGuildSettings": { enabled: true, description: "New guild settings" },
                "NoF1": { enabled: true, description: "Disable F1 help" },
                "NoMosaic": { enabled: true, description: "No image mosaic" },
                "NoPendingCount": { enabled: true, description: "No pending count" },
                "NoProfileThemes": { enabled: false, description: "Disable profile themes" },
                "NoScreensharePreview": { enabled: true, description: "No screenshare preview" },
                "NoUnblockToJump": { enabled: true, description: "No unblock to jump" },
                "OnePingPerDM": { enabled: true, description: "One ping per DM" },
                "OpenInApp": { enabled: true, description: "Open in app" },
                "PermissionsViewer": { enabled: true, description: "View permissions" },
                "PictureInPicture": { enabled: true, description: "Picture in Picture" },
                "PinDMs": { enabled: true, description: "Pin DMs", settings: { pinOrder: "recent" } },
                "PlainFolderIcon": { enabled: false, description: "Plain folder icon" },
                "PlatformIndicators": { enabled: true, description: "Platform indicators" },
                "PreviewMessage": { enabled: true, description: "Preview message before send" },
                "QuickMention": { enabled: true, description: "Quick mention users" },
                "ReactErrorDecoder": { enabled: true, description: "Decode React errors" },
                "RelationshipNotifier": { enabled: true, description: "Friend request notifications" },
                "RevealAllSpoilers": { enabled: true, description: "Reveal all spoilers" },
                "ReverseImageSearch": { enabled: true, description: "Reverse image search" },
                "RoleColorEverywhere": { enabled: true, description: "Role colors everywhere", settings: { chatMentions: true, memberList: true, voiceUsers: true } },
                "ScrollToText": { enabled: true, description: "Scroll to text" },
                "ServerInfo": { enabled: true, description: "Server info command" },
                "ServerListIndicators": { enabled: true, description: "Server list indicators" },
                "ServerProfile": { enabled: true, description: "View server profiles" },
                "ShikiCodeblocks": { enabled: true, description: "Syntax highlighting", settings: { theme: "dark-plus" } },
                "ShowAllMessageButtons": { enabled: true, description: "Show all message buttons" },
                "ShowConnections": { enabled: true, description: "Show user connections" },
                "ShowHiddenThings": { enabled: true, description: "Show hidden things" },
                "ShowMeYourName": { enabled: true, description: "Show real names" },
                "ShowTimeouts": { enabled: true, description: "Show timeouts" },
                "SortFriendRequests": { enabled: true, description: "Sort friend requests" },
                "Summaries": { enabled: true, description: "Channel summaries" },
                "ThemeAttributes": { enabled: true, description: "Theme attributes" },
                "TimeBarAllActivities": { enabled: true, description: "Timebar for all activities" },
                "UnlockedAvatarZoom": { enabled: true, description: "Unlocked avatar zoom" },
                "UserVoiceShow": { enabled: true, description: "Show user voice state" },
                "USRBG": { enabled: true, description: "Custom user backgrounds" },
                "ValidReply": { enabled: true, description: "Validate reply messages" },
                "VideoSpeed": { enabled: true, description: "Video speed control" },
                "ViewIcons": { enabled: true, description: "View full icons" },
                "ViewRaw": { enabled: true, description: "View raw message" },
                "WebContextMenus": { enabled: true, description: "Web context menus" },
                "WebKeybinds": { enabled: true, description: "Web keybinds" },
                "WebScreenShareFixes": { enabled: true, description: "Web screenshare fixes" },
                "XSOverlay": { enabled: false, description: "XSOverlay integration" }
            },
            
            // ============ PRIVACY & SECURITY ============
            privacy: {
                "NoTrack": { enabled: true, required: true, description: "Blocks Discord tracking/analytics" },
                "ClearURLs": { enabled: true, description: "Removes tracking from URLs" },
                "AnonymiseFileNames": { enabled: true, description: "Randomize file names" },
                "NoScreensharePreview": { enabled: true, description: "No screenshare preview" },
                "SilentTyping": { enabled: true, description: "Hide typing indicator" },
                "DisableCallIdle": { enabled: true, description: "Disable call idle" },
                "IgnoreActivities": { enabled: true, description: "Hide activities" },
                "NoSystemBadge": { enabled: false, description: "No system badge" },
                "StreamerModeOnStream": { enabled: true, description: "Auto streamer mode" }
            },
            
            // ============ NITRO FEATURES ============
            nitro: {
                "FakeNitro": { enabled: true, description: "Use Nitro features for free", settings: { 
                    enableEmojiBypass: true, 
                    enableStickerBypass: true, 
                    enableStreamQualityBypass: true,
                    transformEmojis: true,
                    transformStickers: true,
                    transformCompoundSentence: false
                }},
                "FreeEmojis": { enabled: true, description: "Use any emoji" },
                "NitroBypass": { enabled: true, description: "Bypass Nitro restrictions" },
                "EmoteCloner": { enabled: true, description: "Clone emotes" },
                "MoreUserTags": { enabled: true, description: "More user tags" },
                "StreamerModeOnStream": { enabled: true, description: "Streamer mode on stream" }
            },
            
            // ============ VOICE & AUDIO ============
            voice: {
                "VcDoubleClick": { enabled: true, description: "Double click to join VC" },
                "VcNarrator": { enabled: false, description: "VC narrator" },
                "VoiceChatUtilities": { enabled: true, description: "VC utilities" },
                "VolumeBooster": { enabled: true, description: "Boost volume" },
                "SpotifyControls": { enabled: true, description: "Spotify controls" },
                "SpotifyCrack": { enabled: true, description: "Spotify features" },
                "SpotifyShareCommands": { enabled: true, description: "Spotify share commands" },
                "WebRichPresence": { enabled: true, description: "Web rich presence" }
            },
            
            // ============ DEVELOPER ============
            developer: {
                "Experiments": { enabled: true, description: "Enable Discord experiments" },
                "ConsoleShortcuts": { enabled: true, description: "Console shortcuts" },
                "DevCompanion": { enabled: false, description: "Dev companion" },
                "ReactErrorDecoder": { enabled: true, description: "Decode React errors" },
                "ViewRaw": { enabled: true, description: "View raw message data" },
                "SettingsStoreAPI": { enabled: true, description: "Settings Store API" }
            },
            
            // ============ FUN ============
            fun: {
                "MoreKaomoji": { enabled: true, description: "More kaomoji" },
                "Moyai": { enabled: false, description: "🗿🗿🗿" },
                "Party mode": { enabled: false, description: "Party mode effects" },
                "Petpet": { enabled: true, description: "Pet pet GIF generator" },
                "SecretRingTone": { enabled: false, description: "Secret ring tone" }
            },
            
            // ============ EQUICORD EXCLUSIVE ============
            equicord: {
                "BetterActivities": { enabled: true, description: "Better activities display" },
                "BetterQuickReact": { enabled: true, description: "Better quick reactions" },
                "CustomSounds": { enabled: true, description: "Custom notification sounds" },
                "DoubleCounterVerify": { enabled: true, description: "Double counter verify bypass" },
                "EmojiDumper": { enabled: true, description: "Dump server emojis" },
                "GuildInfo": { enabled: true, description: "View guild information" },
                "HiddenChannelIcons": { enabled: true, description: "Icons for hidden channels" },
                "JumpToStart": { enabled: true, description: "Jump to first message" },
                "MessageLatency": { enabled: true, description: "Show message latency" },
                "NoMaskedUrlPaste": { enabled: true, description: "No masked URL paste" },
                "NoNitroUpsell": { enabled: true, description: "Remove Nitro upsells" },
                "NoPremiumUpsells": { enabled: true, description: "Remove premium upsells" },
                "OverrideForumDefaults": { enabled: true, description: "Override forum defaults" },
                "ReplaceGoogleSearch": { enabled: true, description: "Replace Google search" },
                "ReplyTimestamp": { enabled: true, description: "Show reply timestamp" },
                "TABCompleteGIFs": { enabled: true, description: "Tab complete GIFs" },
                "YoutubeAdblock": { enabled: true, description: "Block YouTube ads" },
                "ThemeLibrary": { enabled: true, description: "Theme library" },
                "PluginLibrary": { enabled: true, description: "Plugin library" }
            }
        },
        
        // Theme settings
        themes: {
            enabled: true,
            current: "default",
            customCSS: "",
            themeLinks: [],
            quickCSS: "",
            clientTheme: {
                enabled: false,
                color: "#5865F2"
            }
        },
        
        // Updater settings
        updater: {
            autoUpdate: true,
            checkOnStartup: true,
            notifyUpdates: true,
            branch: "stable"
        },
        
        // Cloud settings
        cloud: {
            enabled: false,
            syncSettings: false,
            syncPlugins: false,
            syncThemes: false,
            backupUrl: ""
        },
        
        // Backup settings
        backup: {
            autoBackup: true,
            backupInterval: 24, // hours
            maxBackups: 5
        }
    };

    // ============== STORAGE ==============
    const Storage = {
        prefix: 'equicord_',
        get(key, defaultValue) {
            try {
                const value = localStorage.getItem(this.prefix + key);
                return value ? JSON.parse(value) : defaultValue;
            } catch (e) {
                return 
