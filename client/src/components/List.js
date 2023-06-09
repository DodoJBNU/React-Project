import React, { useEffect, useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import { TbMapSearch } from 'react-icons/tb';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { BsBookmarkStar } from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import axios from 'axios';
function List({ UpdateLocations }) {
  // 목록 데이터
  const [buttonName, setButtonName] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const url = `/Main?user_id=${user_id}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(buttonName);

    if (buttonName === 'inquiryButton') {
      addLocationId({})
        .then((response) => {
          UpdateLocations(response.data);
          //window.location.href = url;
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (buttonName === 'favoriteButton') {
      addFavorite({}).then((response) => {
        UpdateLocations(response.data);
      });
    }
  };

  const addFavorite = () => {
    const formData = new FormData();

    formData.append('action', 'favorite');
    formData.append('user_id', user_id);

    return axios.post(url, formData);
  };
  const addLocationId = () => {
    const formData = new FormData();
    formData.append('action', 'inquiry');

    return axios.post(url, formData);
  };

  useEffect(() => {});
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="MainList">
        <div className="List">산책로 목록</div>
        <div className="item1">
          <button
            className="item1Button"
            type="submit"
            onClick={() => {
              setButtonName('inquiryButton');
            }}
          >
            <TbMapSearch className="item1Image" />
            <span className="item1Span">산책로 조회</span>
          </button>
        </div>

        <div className="item2">
          <Link className="item2Link" Link to={`/Add?user_id=${user_id}`} type="button">
            <button className="item2Button">
              <IoIosAddCircleOutline className="item2Image" />
              <span className="item2Span">산책로 추가</span>
            </button>
          </Link>
        </div>

        <div className="item3">
          <button
            className="item3Button"
            type="submit"
            onClick={() => {
              setButtonName('favoriteButton');
            }}
          >
            <BsBookmarkStar className="item3Image" />
            <span className="item3Span">즐겨찾기</span>
          </button>
        </div>

        <div className="item4">
          <Link className="item4Link" type="button" Link to={`/`}>
            <button className="item4Button">
              <RxExit className="item4Image" />
              <span className="item4Span">종료</span>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default List;
