import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './HomeCarousel.css';
import slideService from "./../../../api/slideService";
import SlideSkeleton from './../loading/SlideSkeleton'; // Import loader

const HomeCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hàm gọi API để lấy danh sách slide
        const fetchSlides = async () => {
            try {
                const response = await slideService.getListsGuest({
                    page_site: "home",
                    page: 0,
                    page_size: 10
                });
                setSlides(response.data.data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    return (
        <Container fluid className="carousel-fullscreen">
            {loading ? (
                // Hiển thị Skeleton Loader khi đang tải
                <SlideSkeleton />
            ) : (
                // Hiển thị Carousel khi dữ liệu đã sẵn sàng
                <Carousel>
                    {slides.map((slide, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                className="d-block w-100"
                                src={slide.avatar}
                                alt={slide.name}
                            />
                            <Carousel.Caption>
                                <h3>{slide.name}</h3>
                                <p>{slide.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </Container>
    );
};

export default HomeCarousel;
