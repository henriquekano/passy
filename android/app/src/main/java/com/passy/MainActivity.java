package com.passy;

import android.app.Activity;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.facebook.react.modules.storage.AsyncLocalStorageUtil;

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

      @Override
      protected void onCreate(Bundle savedInstanceState) {
        SQLiteDatabase readableDatabase = null;
        readableDatabase = ReactDatabaseSupplier
                .getInstance( self.getApplicationContext())
                .getReadableDatabase();

        String onboardingShown = null;
        if (readableDatabase != null) {
          onboardingShown = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "onboardingShown");
        }
        Bundle bundle = new Bundle();
        bundle.putBoolean("onboardingShown", "true".equals(onboardingShown));
        Log.i("MainActivity", "onboardingShown: "+ (onboardingShown));

        this.bundle = bundle;
        super.onCreate(savedInstanceState);
      }

      @Override
      protected Bundle getLaunchOptions() {
        return bundle;
      }
    };
  }
}
