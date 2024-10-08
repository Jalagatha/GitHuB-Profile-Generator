import React, { useState, useEffect } from 'react'
import { domain } from '../Domain';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { name } = useParams()
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [repos, setRepos] = useState([])
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    async function getData(url) {
        setLoading(true)
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const res = await response.json();
            return res;

        } catch (error) {
            console.error(error.message);
            return null;
        }
        finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        const getProfile = async () => {
            if (name) {
                const response = await getData(`${domain}/${name}`);
                console.log(response)
                setProfile(response); // Set the profile using the returned response
            }
        };
        getProfile()
    }, [])

    useEffect(()=>{
        if(profile){
            const getRepos = async () => {
                if (name) {
                    const response = await getData(profile.repos_url);
                    console.log(response)
                    setRepos(response);
                }
            };
            getRepos()
        }
    }, [profile])

    return (
        <div className='details'>
            {loading && <p>Loading...</p>}
            {!profile && <p>No profile found.</p>}
            <p>This is the icon </p>
            {profile &&
                <div className='card'>
                    <img src={profile.avatar_url} />
                    <h2>{profile.name}</h2>
                    <a href={profile.html_url}>@{profile.login}</a>
                    <p style={{ display: "none" }}>{JSON.stringify(profile)}</p>
                    <div className='flex'>
                        <p>{profile.location}</p>
                        <p>{new Date(profile.created_at).toLocaleDateString('en-US', options)}</p>
                    </div>
                    <div className='flex stats'>
                        <div>
                            <p>{profile.public_repos}</p>
                            <p>REPOSITORIES</p>
                        </div>
                        <div>
                            <p>{profile.followers}</p>
                            <p>FOLLOWERS</p>
                        </div>
                        <div>
                            <p>{profile.following}</p>
                            <p>FOLLOWING</p>
                        </div>
                    </div>
                </div>
            }
            <div style={{textAlign:"left"}}>
                <h2 style={{textAlign:"left", margin:"20px 0", paddingBottom: 10, borderBottom:"3px dotted teal", display:"inline"}}>Top Repos</h2>
                <div className='flex' style={{paddingTop: 20}}>
                    {repos && repos.slice(0, 8).map(repo => 
                        <div key={repo.id} className='repo'>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div className='flex'>
                                    <p>{repo.stargazers_count}</p>
                                    <p>{repo.forks_count}</p>
                                </div>
                                <p>{repo.size}KB</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details