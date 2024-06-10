import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateChange } from '../redux/user/userSlice';
import { IoExpandSharp } from 'react-icons/io5';
import { LuShrink } from 'react-icons/lu';
import { IoMdRefresh } from 'react-icons/io';
import { getRandomInt } from '../helper';
import { toast } from 'react-toastify';
const CallTrailRightPartHeader = ({ name_data }) => {
  const dispatch = useDispatch();
  const { CURRENT_TAB, TABS, REPORT_FULLSCREEN, ACTIVITIES_FETCHER } =
    useSelector((store) => store.user);
  const handleFullscreenBtn = () => {
    dispatch(
      handleStateChange({
        name: 'REPORT_FULLSCREEN',
        value: !REPORT_FULLSCREEN,
      })
    );
  };
  const handleRefreshBtn = () => {
    //  state.ACTIVITIES_FETCHER = getRandomInt(1, 100);
    //  toast.success('Successfully created');
    dispatch(
      handleStateChange({
        name: 'ACTIVITIES_FETCHER',
        value: getRandomInt(1, 100),
      })
    );
    dispatch(
      handleStateChange({
        name: 'OPEN_DROPDOWN',
        value: {},
      })
    );
    toast.success('Successfully refreshed');
  };
  return (
    <div className='darkMainHead '>
      <div className='buttons-tab'>
        {TABS.map((tab, i) => {
          if (tab == name_data)
            return (
              <>
                <button
                  className={`lyte-button outlineprimary  newbutton rounded ${
                    name_data === tab ? 'active-rounded' : 'in-active'
                  }`}
                  // onClick={() => {
                  //   dispatch(
                  //     handleStateChange({ name: 'CURRENT_TAB', value: tab })
                  //   );
                  // }}
                >
                  {tab}
                </button>
              </>
            );
        })}
      </div>
      {name_data == 'Call History' && (
        <div
          className='expand-shrink-div header-sort-icon'
          onClick={handleRefreshBtn}
        >
          <IoMdRefresh
            data-tooltip-id='refresh_call_history'
            className='icon_min_max'
          />
        </div>
      )}
      {/* <div
        className='expand-shrink-div header-sort-icon'
        onClick={handleFullscreenBtn}
      >
        {REPORT_FULLSCREEN ? (
          <LuShrink data-tooltip-id='report_min' className='icon_min_max' />
        ) : (
          <IoExpandSharp
            data-tooltip-id='report_max'
            className='icon_min_max'
          />
        )}
      </div> */}
    </div>
  );
};

export default CallTrailRightPartHeader;
