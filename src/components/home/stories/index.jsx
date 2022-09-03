import { ArrowRight, Plus } from '../../../svg';
import Story from './Story';
import { stories } from '../../../utils/allMenuData';

import './stories.css';

export default function Stories() {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="/images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>

      {stories.map((story) => (
        <Story story={story} key={story.id} />
      ))}

      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
