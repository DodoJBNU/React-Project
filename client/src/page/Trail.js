import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link, useResolvedPath } from 'react-router-dom';
import Head from '../components/Head';
import axios from 'axios';
import LocationMap from '../components/LocationMap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiMailAddLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import CommentList from '../components/CommentList';
import './Trail.css';

function Trail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const trail_id = searchParams.get('trail_id');

  const [comment, setComment] = useState('');
  const [Trails, setTrails] = useState([]);
  // [id, user_id, location_id, title, review, facilities]
  // [Latlocation1,Lnglocation1,Latlocation2,Lnglocation2,Latlocation3,Lnglocation3,Latlocation4,Lnglocation4,Latlocation5,Lnglocation5]
  // [comment_id, user_id, trail_id, comment]
  // 이 세 배열을 [[Trail, location, comment]] 과 같은 형태로 저장해두었음.

  const url = `/Trail?user_id=${user_id}&trail_id=${trail_id}`;

  const getTrailData = () => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);
    formData.append('postFlag', 'getTrailData');

    return axios.post(url, formData);
  };
  useEffect(() => {
    const handleFormSubmit = (e) => {
      getTrailData({})
        .then((response) => {
          setTrails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    handleFormSubmit(); // 함수 호출 추가
  }, []);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    addComments()
      .then((response) => {
        console.log(response.data);
        window.location.href = `/Trail?user_id=${Trails[0][1]}&trail_id=${trail_id}`;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addComments = () => {
    const formData = new FormData();
    formData.append('postFlag', 'addComments');
    formData.append('comment', comment);
    formData.append('user_id', user_id);
    formData.append('trail_id', trail_id);

    return axios.post(url, formData);
  };
  return (
    <form onSubmit={handleButtonSubmit}>
      {Trails.length > 0 && (
        <div className="Main">
          <div className="Left">
            <div className="Map">
              <LocationMap TrailData={Trails} className="LocationMap" />
            </div>
          </div>
          <div className="Right">
            <div className="head">
              <Head />
            </div>

            <div className="TrailDataListMain">
              <div className="TrailDataBox">
                <div className="DataBoxHead">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="DataBoxButtonSpace">
                      <Link to={`/Main?user_id=${user_id}`}>
                        <IoMdArrowRoundBack className="DataBoxBackButton" />
                      </Link>
                    </div>
                    <span className="DataBoxHeadText">{Trails[0][3].length != 0 ? Trails[0][3] : '산책로 이름이 없습니다.'}</span>
                  </div>
                </div>
                <div className="ScrollBox">
                  <div className="TrailReview">{Trails[0][4].length != 0 ? Trails[0][4] : '사용자 후기가 존재하지 않습니다.'}</div>
                  <div className="TrailFacilities">
                    <div className="TrailFacilitiesHead">편의시설</div>
                    <div className="TrailFacilitiesBody">{Trails[0][5].length != 0 ? Trails[0][5] : '편의시설 정보가 존재하지 않습니다.'}</div>
                  </div>
                  <div className="CommentBox">
                    <div className="ShowComments">
                      <div className="ShowCommentsBody">
                        <CommentList comments={Trails[2]} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="AddComment">
                  <div className="UserImg">
                    <AiOutlineUser className="UserImgFile" />
                  </div>
                  <input
                    className="AddCommentTextBox"
                    type="text"
                    placeholder="댓글을 남겨주세요!"
                    name="CommentText"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <div className="AddCommentButtonBox">
                    <button className="AddCommentButton" type="submit">
                      <RiMailAddLine className="CommentButtonImg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Trail;
