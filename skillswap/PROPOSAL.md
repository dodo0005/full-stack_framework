# Project proposal

* Name: Mahmoud NASSER
* Project title: skillswap
* Pitch (one sentence): SkillSwap is a platform that connects people who want to exchange their skills, allowing them to teach what they know while learning something new from others.
* Target users: Students, young adults, hobbyists and anyone interested in learning new skills or sharing their knowledge with others.

## Pages

| URL | Content | Dynamic segment? | Rendering strategy and why |
|---|---|---|---|
## Pages

| URL | Purpose | Dynamic segment? | Rendering strategy and why |
|---|---|---|---|
| `/` | Homepage with introduction, featured skills and popular categories | No | Static rendering because the content does not need to change on every request |
| `/skills` | Browse all available skills | No | Static rendering because the skills catalogue can be generated at build time |
| `/skills/[id]` | Details of one skill and its owner | Yes | Static Site Generation (SSG) because individual skill pages can be generated at build time using known skill IDs |
| `/members/[id]` | Public profile showing skills offered and wanted | Yes | Static Site Generation (SSG) because public member profiles can be generated at build time |
| `/exchanges` | Overview of sent and received exchange requests | No | Dynamic rendering (SSR) because exchange information is personalized and needs to be retrieved for each request |
| `/exchanges/[id]` | Details of an exchange, including participants, skills and status | Yes | Dynamic rendering (SSR) because exchange details depend on frequently changing request information |

## Data

Entities (2 to 4), their main fields, and how they are related:
User: id, name, email, bio, profileImage.

Skill: id, title, description, category, type (offered or wanted), userId.

Exchange: id, requesterId, receiverId, offeredSkillId, requestedSkillId, status (pending, accepted, rejected or completed), createdAt.

Relationships:

One User can create multiple Skills.

One User can send and receive multiple Exchanges.

Each Exchange connects two Users and the Skills they want to exchange.


## Write actions

What users can create, update or delete:

Users can:

Create and update their profiles.

Add new skills they can teach or want to learn.

Edit and delete their own skills.

Send exchange requests to other users.

Accept or reject received exchange requests.

Cancel pending exchange requests.

Mark accepted exchanges as completed.

## Repository

GitHub URL: https://github.com/dodo0005/skillswap
