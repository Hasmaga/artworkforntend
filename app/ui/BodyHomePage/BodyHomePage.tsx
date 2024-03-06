'use client';
import { useState } from 'react';
import PosterArtwork from "../PosterArtwork/PosterArtwork";
import PopupComment from '../PopupComment/PopupComment';

export default function BodyHomePage() {
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [postId, setPostId] = useState<string>();
    const handleCommentButtonClick = (postId: string) => {
        setPostId(postId);
        setShowCommentPopup(true);
    };
    return (
        <div className="flex flex-col items-center pl-10 pr-10">
            <PosterArtwork onCommentButtonClick={handleCommentButtonClick} />
            {postId && showCommentPopup && (
                <PopupComment setShowCommentPopup={setShowCommentPopup} postId={postId} />
            )}
        </div>
    )
}