package com.passy;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;

public class AsyncStorageUtil {
    private SQLiteDatabase readableDatabase;

    public void init(Context context) throws Exception {
        this.readableDatabase = ReactDatabaseSupplier
                .getInstance(context)
                .getReadableDatabase();
        if (this.readableDatabase == null) {
            throw new Exception("Hmm, couldn't instantiate the database");
        }
    }

    public String get(String key) {
        return AsyncLocalStorageUtil.getItemImpl(readableDatabase, key);
    }

    public void dispose() {
        this.readableDatabase.close();
    }

    public void clearAndDispose(Context context) {
        ReactDatabaseSupplier
                .getInstance(context)
                .clearAndCloseDatabase();
    }
}
