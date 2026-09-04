using Chama_Jussa.BdContextJussa;
using Chama_Jussa.Interfaces;
using Chama_Jussa.Models;
using Microsoft.EntityFrameworkCore;

namespace Chama_Jussa.Repositories;

public class ServicoRepository : IServicoRepository
{
    private readonly ChamadaContext _context;

    public ServicoRepository(ChamadaContext context)
    { 
        _context = context;
    }

    public void AtualizarIdCorpo(ServicoTb servicoAtualizado)
    {
        try
        {
            ServicoTb servicoBuscado = _context.ServicoTbs.Find(servicoAtualizado.IdServico)!;

            if (servicoBuscado != null)
            {
                servicoBuscado.Descricao = servicoAtualizado.Descricao;
            }

            _context.SaveChanges();

        }
        catch 
        {
            throw;
        }
    }

    public void AtualizarIdUrl(Guid Id, ServicoTb servicoAtualizado)
    {
        try
        {
            ServicoTb servicoBuscado = _context.ServicoTbs.Find(Id)!;
            if (servicoBuscado != null)
            {
                var situacaoAntiga = servicoBuscado.Situacao;

                servicoBuscado.Titulo = servicoAtualizado.Titulo;
                servicoBuscado.Maquina = servicoAtualizado.Maquina;
                servicoBuscado.Localização = servicoAtualizado.Localização;
                servicoBuscado.Descricao = servicoAtualizado.Descricao;
                servicoBuscado.Situacao = servicoAtualizado.Situacao;
                if (!String.IsNullOrEmpty(servicoAtualizado.Imagem))
                {
                    servicoBuscado.Imagem = servicoAtualizado.Imagem;
                }

                // Cria notificação automática caso a situação tenha mudado
                if (!String.IsNullOrWhiteSpace(servicoAtualizado.Situacao) &&
                    !String.Equals(situacaoAntiga, servicoAtualizado.Situacao, StringComparison.OrdinalIgnoreCase))
                {
                    string statusFormatado = servicoAtualizado.Situacao.Trim().ToLower();
                    string msg = statusFormatado switch
                    {
                        "andamento" => $"A Ordem de Serviço '{servicoBuscado.Titulo}' agora está em andamento com a equipe técnica.",
                        "concluido" => $"A Ordem de Serviço '{servicoBuscado.Titulo}' foi finalizada e concluída!",
                        _ => $"A Ordem de Serviço '{servicoBuscado.Titulo}' mudou de status para {servicoAtualizado.Situacao}."
                    };

                    var notif = new NotificacaoTb
                    {
                        IdNotificacao = Guid.NewGuid(),
                        IdUsuario = servicoBuscado.IdUsuario,
                        IdServico = servicoBuscado.IdServico,
                        Mensagem = msg,
                        DataHora = DateTime.Now
                    };
                    _context.NotificacaoTbs.Add(notif);
                }

                _context.SaveChanges();
            }
        }
        catch
        {
            throw;
        }
    }

    public ServicoTb BuscarPorId(Guid Id)
    {
        try
        {
            ServicoTb servicoBuscado = _context.ServicoTbs
                .Include(s => s.IdUsuarioNavigation)
                .FirstOrDefault(s => s.IdServico == Id)!;
            return servicoBuscado;
        }
        catch
        {
            throw;
        }
    }

    public void Cadastrar(ServicoTb novoServico)
    {
        try
        {
            novoServico.IdServico = Guid.NewGuid();
            if (novoServico.DataCriacao == default)
            {
                novoServico.DataCriacao = DateTime.Now;
            }

            _context.ServicoTbs.Add(novoServico);

            // Cria automaticamente a notificação de abertura no banco
            var notif = new NotificacaoTb
            {
                IdNotificacao = Guid.NewGuid(),
                IdUsuario = novoServico.IdUsuario,
                IdServico = novoServico.IdServico,
                Mensagem = $"Ordem de Serviço criada: '{novoServico.Titulo}' no setor {novoServico.Localização}.",
                DataHora = DateTime.Now
            };
            _context.NotificacaoTbs.Add(notif);

            _context.SaveChanges();
        }
        catch
        {
            throw;
        }
    }

    public void Deletar(Guid Id)
    {
        try
        {
            ServicoTb servicoBuscado = _context.ServicoTbs.Find(Id)!;

            if (servicoBuscado != null)
            {
                // Remove todas as notificações vinculadas a este serviço
                var notificacoes = _context.NotificacaoTbs
                    .Where(n => n.IdServico == Id)
                    .ToList();

                if (notificacoes.Any())
                {
                    _context.NotificacaoTbs.RemoveRange(notificacoes);
                }

                _context.ServicoTbs.Remove(servicoBuscado);
            }
            _context.SaveChanges();
        }
        catch
        {
            throw;
        }
    }

    public List<ServicoTb> Listar()
    {
        try
        {
            List<ServicoTb> listaServicos = _context.ServicoTbs
                .Include(s => s.IdUsuarioNavigation)
                .OrderByDescending(s => s.DataCriacao)
                .ToList();
            return listaServicos;
        }
        catch
        {
            throw;
        }
    }
}
