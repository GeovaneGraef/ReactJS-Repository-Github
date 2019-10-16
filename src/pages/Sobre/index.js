import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading, Owner, IssueList } from './styles';
import Container from '../../components/container';

export default class Sobre extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          repository: PropTypes.string,
        }),
      }).isRequired,
    };

    state = {
      repository: {},
      issues: [],
      loading: true,
    }

    async componentDidMount() {
      const { match } = this.props;

      const repoName = decodeURIComponent(match.params.repository);

      const [repository, issues] = await Promise.all([
         api.get(`/repos/${repoName}`),
         api.get(`/repos/${repoName}/issues`, {
           paramas: {
             state: 'open',
             per_page: 5,
           }
         })
      ])

      this.setState({ 
        repository: repository.data,
        loading: false,
        issues: issues.data,
      });
    }

    render() {
      const { repository, issues, loading } = this.state;

      if (loading) {
        return <Loading>Carregando</Loading>;
      }

      return (
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {issues.map(show => (
              <li key={String(show.id)}>
                <img src={show.user.avatar_url} alt={show.user.login} />
                <div>
                  <strong>
                    <a href={show.html_url}>{show.title}</a>
                    {}
                  </strong>
                  <p>{show.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
        </Container>
      );
    }
}

