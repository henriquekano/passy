package com.passy;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "passy";
  }

  /*
   * The bundle will be accessible via {this.props} in the JS side
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    Activity self = this;
    return new ReactActivityDelegate(this, getMainComponentName()) {
      private Bundle bundle = null;
      private AsyncStorageUtil asyncStorageUtil = new AsyncStorageUtil();

      @Override
      protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(self);
        try {
          asyncStorageUtil.init(self.getApplicationContext());
          String onboardingShown = this.asyncStorageUtil.get("onboardingShown");
          Bundle bundle = new Bundle();
          bundle.putBoolean("onboardingShown", "true".equals(onboardingShown));
          Log.i("MainActivity", "onboardingShown: "+ (onboardingShown));
          this.bundle = bundle;
        } catch (Exception e) {
          e.printStackTrace();
        }

        super.onCreate(savedInstanceState);
      }

      @Override
      protected Bundle getLaunchOptions() {
        return bundle;
      }
    };
  }
}
