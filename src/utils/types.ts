export interface OwnerData {
    [key: string]: any;
}

export interface Resume {
    name: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    summary: string;
    education: {
        degree: {
            type: string;
            field: string;
            institution: string;
            dates: string;
        };
        school: {
            name: string;
            dates: string;
        };
    };
    experience: {
        title: string;
        company: string;
        dates: string;
        responsibilities: string[];
    }[];
    skills: {
        advanced: string[];
        intermediate: string[];
        basic: string[];
    };
}
