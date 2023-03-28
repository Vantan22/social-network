import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import textImg from "../../img/person-img/meovangogh.jpeg";
import "./PersonalInformation.css";

const PersonalInformation = () => {
  return (
    <div className="PersonalInformation">
      <div className="avatar">
        <div>
          <div>
            <img
              src={textImg}
              title="props.userTitle"
              className="userItem-avatar"
            />{" "}
          </div>
          <div className="UserItem-Name">
            <span>
              Văn Tân Nguyễn <FontAwesomeIcon icon="fa-thin fa-user-pen" />
            </span>
            <div className="total">
              <p>4 posts</p>
              <p>10 friends</p>
            </div>
            <div className="description">
              <p>Biết luộc rau nuôi cá :)))</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
