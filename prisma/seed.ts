import prisma from "@/lib/prisma";

const main = async () => {

    await prisma.college.createMany({
        data: [
            {
                name: "IIT Delhi",
                location: "Delhi",
                fees: 250000,
                rating: 4.9,
                overview: "Premier engineering institute known for research and innovation.",
                placements: "Average Package: ₹25 LPA",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
            },
            {
                name: "IIT Bombay",
                location: "Mumbai",
                fees: 260000,
                rating: 4.9,
                overview: "Top-ranked IIT with strong industry connections.",
                placements: "Average Package: ₹28 LPA",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
            },
            {
                name: "IIT Kanpur",
                location: "Kanpur",
                fees: 240000,
                rating: 4.8,
                overview: "Known for academic excellence and research.",
                placements: "Average Package: ₹24 LPA",
                imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            },
            {
                name: "IIT Madras",
                location: "Chennai",
                fees: 245000,
                rating: 4.9,
                overview: "Consistently ranked among India's best engineering colleges.",
                placements: "Average Package: ₹26 LPA",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
            },
            {
                name: "IIT Kharagpur",
                location: "Kharagpur",
                fees: 235000,
                rating: 4.8,
                overview: "Oldest IIT with excellent campus infrastructure.",
                placements: "Average Package: ₹23 LPA",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
            },
            {
                name: "IIT Roorkee",
                location: "Roorkee",
                fees: 230000,
                rating: 4.7,
                overview: "Historic engineering institution with strong placements.",
                placements: "Average Package: ₹22 LPA",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
            },
            {
                name: "NIT Trichy",
                location: "Trichy",
                fees: 180000,
                rating: 4.7,
                overview: "Leading NIT known for academics and placements.",
                placements: "Average Package: ₹16 LPA",
                imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            },
            {
                name: "NIT Surathkal",
                location: "Mangalore",
                fees: 175000,
                rating: 4.6,
                overview: "Popular NIT with strong industry exposure.",
                placements: "Average Package: ₹15 LPA",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
            },
            {
                name: "NIT Warangal",
                location: "Warangal",
                fees: 170000,
                rating: 4.6,
                overview: "One of the top NITs in India.",
                placements: "Average Package: ₹14 LPA",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
            },
            {
                name: "NIT Calicut",
                location: "Kozhikode",
                fees: 165000,
                rating: 4.5,
                overview: "Renowned institute in South India.",
                placements: "Average Package: ₹13 LPA",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
            },
            {
                name: "NIT Rourkela",
                location: "Rourkela",
                fees: 160000,
                rating: 4.5,
                overview: "Known for technical excellence and innovation.",
                placements: "Average Package: ₹13 LPA",
                imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            },
            {
                name: "IIIT Hyderabad",
                location: "Hyderabad",
                fees: 300000,
                rating: 4.8,
                overview: "Top destination for Computer Science studies.",
                placements: "Average Package: ₹30 LPA",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
            },
            {
                name: "IIIT Delhi",
                location: "Delhi",
                fees: 290000,
                rating: 4.7,
                overview: "Research-focused institute specializing in technology.",
                placements: "Average Package: ₹25 LPA",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
            },
            {
                name: "IIIT Bangalore",
                location: "Bangalore",
                fees: 310000,
                rating: 4.8,
                overview: "Strong AI and software engineering programs.",
                placements: "Average Package: ₹27 LPA",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
            },
            {
                name: "BITS Pilani",
                location: "Pilani",
                fees: 450000,
                rating: 4.8,
                overview: "Prestigious private engineering institute.",
                placements: "Average Package: ₹24 LPA",
                imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            },
            {
                name: "VIT Vellore",
                location: "Vellore",
                fees: 220000,
                rating: 4.4,
                overview: "Large private university with diverse programs.",
                placements: "Average Package: ₹9 LPA",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
            },
            {
                name: "MIT Manipal",
                location: "Manipal",
                fees: 350000,
                rating: 4.5,
                overview: "Well-known private engineering college.",
                placements: "Average Package: ₹10 LPA",
                imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
            },
            {
                name: "SRM Institute",
                location: "Chennai",
                fees: 280000,
                rating: 4.3,
                overview: "Popular private university with modern infrastructure.",
                placements: "Average Package: ₹8 LPA",
                imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
            },
            {
                name: "DTU",
                location: "Delhi",
                fees: 150000,
                rating: 4.6,
                overview: "Top state engineering university in Delhi.",
                placements: "Average Package: ₹18 LPA",
                imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
            },
            {
                name: "NSUT",
                location: "Delhi",
                fees: 145000,
                rating: 4.5,
                overview: "Highly regarded engineering university in Delhi.",
                placements: "Average Package: ₹17 LPA",
                imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
            },
        ],
    });

    const colleges = await prisma.college.findMany();

    const collegeMap = Object.fromEntries(
        colleges.map((college) => [college.name, college.id])
    );

    for (const college of colleges) {
  await prisma.course.createMany({
    data: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        fees: college.fees,
        collegeId: college.id,
      },
      {
        name: "B.Tech AI & ML",
        duration: "4 Years",
        fees: college.fees + 10000,
        collegeId: college.id,
      },
      {
        name: "B.Tech Data Science",
        duration: "4 Years",
        fees: college.fees + 5000,
        collegeId: college.id,
      },
    ],
  });
}
    for (const college of colleges) {
  await prisma.review.createMany({
    data: [
      {
        comment: "Excellent faculty and placement opportunities.",
        rating: 5,
        userName: "Rajat Kumar",
        collegeId: college.id,
      },
      {
        comment: "Great campus life and supportive professors.",
        rating: 4,
        userName: "Aman Sharma",
        collegeId: college.id,
      },
      {
        comment: "Strong academics with good industry exposure.",
        rating: 5,
        userName: "Priya Singh",
        collegeId: college.id,
      },
      {
        comment: "Good infrastructure but hostel facilities could improve.",
        rating: 4,
        userName: "Rahul Verma",
        collegeId: college.id,
      },
    ],
  });
}
}

main()
    .then(async () => {
        console.log("Seed completed");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });