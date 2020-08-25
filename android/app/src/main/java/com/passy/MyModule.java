package com.passy;

import android.content.ComponentName;
import android.content.Intent;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class MyModule extends ReactContextBaseJavaModule {
    public MyModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "mymodule";
    }

    @ReactMethod
    public void goToInputSettings() {
        Intent intent = new Intent(
                Settings.ACTION_INPUT_METHOD_SETTINGS
        );
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);
    }

    @ReactMethod
    public void goToLocaleSettings() {
        Intent intent = new Intent();
        intent.setComponent(new ComponentName("com.android.settings","com.android.settings.Settings$InputMethodAndLanguageSettingsActivity"));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        try {
            getReactApplicationContext().startActivity(intent);
        } catch (Exception ex) {
            intent.setComponent(new ComponentName("com.android.settings","com.android.settings.Settings$LanguageAndInputSettingsActivity"));
            try {
                getReactApplicationContext().startActivity(intent);
            } catch (Exception ex2) {
                Intent settingsIntent = new Intent(Settings.ACTION_SETTINGS);
                getReactApplicationContext().startActivity(settingsIntent);
            }
        }
    }
}
