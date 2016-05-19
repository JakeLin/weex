package com.alibaba.weex.uitest;

import android.app.Activity;
import android.app.Application;
import android.app.Instrumentation;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.alibaba.weex.R;
import com.alibaba.weex.util.ScreenShot;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.constants.Constants;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by admin on 16/3/23.
 */
public class WeexUiTestCaseTcDowngradeWeexVFalse extends ActivityInstrumentationTestCase2<WXPageActivity> {
    public final  String TAG = "TestScript_Guide==";
    public WXPageActivity waTestPageActivity;

    public ViewGroup mViewGroup;
    public Application mApplication;
    public Instrumentation mInstrumentation;

    public  ArrayList<View> mCaseListIndexView = new ArrayList<View>();
    public WeexUiTestCaseTcDowngradeWeexVFalse() {
        super(WXPageActivity.class);
    }

    public void setUp() throws Exception{

        Log.e("TestScript_Guide", "setUp  into!!");
        setActivityInitialTouchMode(false);
        mInstrumentation = getInstrumentation();

        Intent intent = new Intent();
        intent.putExtra("bundleUrl", Constants.BUNDLE_URL);
        launchActivityWithIntent("com.alibaba.weex", WXPageActivity.class, intent);
        setActivity(WXPageActivity.wxPageActivityInstance);
        waTestPageActivity = getActivity();
//        waTestPageActivity.getIntent().getData().toString();
        Log.e(TAG,"activity1=" + waTestPageActivity.toString() );
        sleep(3000);

        mViewGroup = (ViewGroup) waTestPageActivity.findViewById(R.id.container);
        mCaseListIndexView = getTestCaseListViewByText("TC");
    }

//    public void testPreConditions()
//    {
//        assertNotNull(waTestPageActivity);
//        assertNotNull(mViewGroup);
//        assertNotNull(mCaseListIndexView);
//
//    }

    public void testDowngrade(){

        for(final View caseView : mCaseListIndexView){
           if (((TextView)caseView).getText().toString().equals("TC_Downgrade")){
               Log.e(TAG, "TC_Downgrade find");

               final TextView inputView  = (TextView)caseView;
                mInstrumentation.runOnMainSync(new Runnable() {
                    @Override
                    public void run() {
                        inputView.requestFocus();
                        inputView.performClick();
                    }
                });

               sleep(2000);

               setActivity(WXPageActivity.wxPageActivityInstance);
               Activity activity2 = getActivity();

               ViewGroup myGroup = (ViewGroup)(activity2.findViewById(R.id.container));
               ArrayList<View> inputListView = new ArrayList<View>();
               myGroup.findViewsWithText(inputListView, "TC_Downgrade_weexV_False", View.FIND_VIEWS_WITH_TEXT);

               Log.e(TAG, "TC_Downgrade_weexV_False== " + inputListView.size());

               if(inputListView.size()!=0){
                  final TextView inputTypeView = (TextView)inputListView.get(0);

                   mInstrumentation.runOnMainSync(new Runnable() {
                       @Override
                       public void run() {
                           inputTypeView.requestFocus();
                           inputTypeView.performClick();
                           Log.e(TAG, "TC_Downgrade_weexV_False clcik!");

                       }
                   });

                   sleep(2000);
                   Log.e(TAG, "TC_Downgrade_weexV_False snap!");
                   screenShot("TC_Downgrade_weexV_False");
//                   ScreenShot.takeScreenShotIncludeDialog(getActivity(), "TC_Downgrade_weexV_False");

                   sleep(2000);

               }
           }
        }

    }



    /**
     * get tc list by text
     * @param byText
     * @return
     * @throws InterruptedException
     */
    public ArrayList<View> getTestCaseListViewByText(String byText) throws InterruptedException {
        Log.e("TestScript_Guide", "byText ==" + byText);

        if(TextUtils.isEmpty(byText)){
            return null;
        }
        ArrayList<View> outViews = new ArrayList<View>();

        mViewGroup.findViewsWithText(outViews, byText, View.FIND_VIEWS_WITH_TEXT);
        for (View view :  outViews){
            String viewText = ((TextView)view).getText().toString();
            Log.e(TAG, "viewText ==" + viewText);


        }
        return outViews;
    }

    /**
     * findMyCaseByText
     */
    public View findMyCaseByText(String caseText){
        if (mCaseListIndexView.size() == 0) return null;

        TextView view = null;
        for(int i=0; i<mCaseListIndexView.size();i++){

            view = (TextView)mCaseListIndexView.get(i);

            if (view.getText().toString().toLowerCase().contains(caseText.toLowerCase())){
                return view;
            }

        }
        return view;
    }

    /**
     * sleep
     */
    public void sleep(long time){
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    /**
     * snapshot
     */
    public void screenShot(String shotName) {
        try {
            ScreenShot.shoot(WXPageActivity.wxPageActivityInstance, shotName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setViewGroup(ViewGroup viewGroup){
        mViewGroup = viewGroup;
    }
}
