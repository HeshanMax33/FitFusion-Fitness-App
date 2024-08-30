import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './viewPostStyle.css';

function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/socialMediaPost');
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id}>
                <p>{comment.userId}: {comment.text}</p>
            </div>
        ));
    };

    const handleLike = (postId) => {
        // Implement like functionality
        console.log('Liked post with ID:', postId);
    };

    const handleComment = (postId) => {
        // Implement comment functionality
        console.log('Commented on post with ID:', postId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='ViewPostHome'>
            <div className='viewPost'>
                {posts.map((post) => (
                    <div key={post._id}>
                        <Slider {...sliderSettings}>
                            {/* Render images */}
                            {post.postImages.map((image, index) => (
                                <div key={index}>
                                    <img src={`data:image/jpeg;base64,${image}`} alt={`Image ${index + 1}`} />
                                </div>
                            ))}
                            {/* Render videos */}
                            {post.postVideos.map((video, index) => (
                                <div key={index}>
                                    <video controls>
                                        <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </Slider>
                        <p>{post.postDescription}</p> {/* Description below the slider */}
                        {/* Render buttons for like and comment below the slider */}
                        <div className="actionButtons">
                            <button onClick={() => handleLike(post._id)}>Like</button>
                            <button onClick={() => handleComment(post._id)}>Comment</button>
                        </div>
                        {/* Render comments */}
                        {post.comments && renderComments(post.comments)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPost;
