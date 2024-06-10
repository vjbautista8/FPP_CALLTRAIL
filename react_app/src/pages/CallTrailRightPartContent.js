import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCRMVariables, getRelatedRecords } from '../redux/user/zoho';
import { handleStateChange } from '../redux/user/userSlice';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import CallHistoryReport from './reports/CallHistoryReport';
import TaskHistoryReport from './reports/TaskHistoryReport';

const CallTrailRightPartContent = ({ name_data }) => {
  const dispatch = useDispatch();
  const {
    META_DATA,
    DONE_ACTIVITIES,
    CURRENT_TAB,
    ACTIVITIES_FETCHER,
    CURRENT_RECORD_DATA,
    REPORT_FULLSCREEN,
  } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchData = async () => {
      if (name_data == 'Call History')
        try {
          await dispatch(handleStateChange({ name: 'ACTIVITIES', value: [] }));
          await dispatch(
            getRelatedRecords({
              Entity: META_DATA.Entity,
              RecordID: META_DATA.EntityId[0],
              RelatedList: 'Activities_History',
            })
          ).then((dispatchResult) => {
            if (dispatchResult.error)
              throw new Error(dispatchResult.error.message);
          });
          await dispatch(
            getRelatedRecords({
              Entity: META_DATA.Entity,
              RecordID: META_DATA.EntityId[0],
              RelatedList: 'Activities',
            })
          ).then((dispatchResult) => {
            if (dispatchResult.error)
              throw new Error(dispatchResult.error.message);
          });
          await dispatch(
            handleStateChange({ name: 'DONE_ACTIVITIES', value: true })
          );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, [dispatch, ACTIVITIES_FETCHER]);
  // if (!DONE_ACTIVITIES) {
  //   return <HourGlassLoading />;
  // }

  const renderContent = () => {
    switch (name_data) {
      case 'Call History':
        return <CallHistoryReport />;
      case 'Tasks':
        return <TaskHistoryReport />;

      case 'Client Research':
        return (
          <>
            <div className='client-page-iframe'>
              <iframe
                src={`https://forms.zohopublic.com.au/firstpointpartners/form/ClientResearch/formperma/FeOQdrAbgLESw2WALkPAlHw7wSiO7K_NMpdLKXJahnw?SingleLine=${
                  CURRENT_RECORD_DATA?.First_Name !== 'null' &&
                  CURRENT_RECORD_DATA?.First_Name !== null
                    ? CURRENT_RECORD_DATA?.First_Name
                    : ''
                }&SingleLine1=${
                  CURRENT_RECORD_DATA?.Last_Name !== 'null' &&
                  CURRENT_RECORD_DATA?.Last_Name !== null
                    ? CURRENT_RECORD_DATA?.Last_Name
                    : ''
                }`}
                frameborder='0'
                className={`${
                  !REPORT_FULLSCREEN ? 'client-iframe' : 'client-iframe-full'
                }`}
              ></iframe>
            </div>
          </>
        );

      default:
        return (
          <div className='no-data-container-new'>
            <img
              src='./no_data_found.png'
              alt='no-data'
              className='warehouse-img'
            />
          </div>
        );
    }
  };
  return renderContent();
};

export default CallTrailRightPartContent;
